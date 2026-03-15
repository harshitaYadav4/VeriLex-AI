from fastapi import APIRouter, Depends, HTTPException, Header
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.database import get_db
from app.schemas import CreateOrderIn, CreateOrderOut, PaymentSuccessIn, PaymentSuccessOut
from app.services.api_key_service import get_or_create_api_key
import os
import hmac
import hashlib

router = APIRouter(tags=["payments"])

RAZORPAY_KEY_SECRET = os.getenv("RAZORPAY_KEY_SECRET", "")
RAZORPAY_KEY_ID = os.getenv("RAZORPAY_KEY_ID", "")

AMOUNTS = {"free": 0, "pro": 49900, "enterprise": 199900}  # paise


async def _get_user_id_from_token(db: AsyncIOMotorDatabase, authorization: Optional[str]) -> Optional[str]:
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization.split(" ", 1)[1].strip()
    import base64
    import json
    try:
        payload_b64 = token.split(".")[1]
        payload_b64 += "=" * (4 - len(payload_b64) % 4)
        payload = json.loads(base64.urlsafe_b64decode(payload_b64))
        users = db["users"]
        doc = await users.find_one({"email": payload.get("email")})
        if not doc and payload.get("sub"):
            doc = await users.find_one({"firebase_uid": payload.get("sub")})
        if doc:
            return str(doc["_id"])
    except Exception:
        pass
    return None


async def get_current_user_id(
    db: AsyncIOMotorDatabase = Depends(get_db),
    authorization: Optional[str] = Header(None),
):
    uid = await _get_user_id_from_token(db, authorization)
    if uid:
        return uid
    users = db["users"]
    first = await users.find_one()
    return str(first["_id"]) if first else None


@router.post("/create-order", response_model=CreateOrderOut)
async def create_order(
    payload: CreateOrderIn,
    db: AsyncIOMotorDatabase = Depends(get_db),
    user_id: Optional[str] = Depends(get_current_user_id),
):
    if not user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")
    amount = AMOUNTS.get(payload.plan.lower(), 0)
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid plan for paid order")
    import uuid
    order_id = f"order_{uuid.uuid4().hex[:24]}"
    return CreateOrderOut(
        amount=amount,
        currency="INR",
        razorpay_order_id=order_id,
    )


def _verify_razorpay_signature(order_id: str, payment_id: str, signature: str) -> bool:
    if not RAZORPAY_KEY_SECRET:
        return True
    body = f"{order_id}|{payment_id}"
    expected = hmac.new(
        RAZORPAY_KEY_SECRET.encode(),
        body.encode(),
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, signature)


@router.post("/payment-success", response_model=PaymentSuccessOut)
async def payment_success(
    payload: PaymentSuccessIn,
    db: AsyncIOMotorDatabase = Depends(get_db),
    user_id: Optional[str] = Depends(get_current_user_id),
):
    if not user_id:
        raise HTTPException(status_code=401, detail="Unauthorized")

    users = db["users"]
    plan = payload.plan.lower() if payload.plan else "free"

    if payload.activate_free or plan == "free":
        await users.update_one({"_id": user_id}, {"$set": {"plan": "free"}})
        api_key = await get_or_create_api_key(db, user_id)
        return PaymentSuccessOut(status="success", plan="free", api_key=api_key)

    if not payload.razorpay_payment_id or not payload.razorpay_order_id or not payload.razorpay_signature:
        raise HTTPException(status_code=400, detail="Missing payment details")

    if not _verify_razorpay_signature(
        payload.razorpay_order_id,
        payload.razorpay_payment_id,
        payload.razorpay_signature,
    ):
        raise HTTPException(status_code=400, detail="Invalid signature")

    amount = AMOUNTS.get(plan, 0)
    await users.update_one({"_id": user_id}, {"$set": {"plan": plan}})
    api_key = await get_or_create_api_key(db, user_id)
    await db["payments"].insert_one({
        "user_id": user_id,
        "plan": plan,
        "amount": amount,
        "razorpay_payment_id": payload.razorpay_payment_id,
        "status": "success",
    })
    return PaymentSuccessOut(status="success", plan=plan, api_key=api_key)
