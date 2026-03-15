from fastapi import APIRouter, Depends, Header
from typing import Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.database import get_db
from app.schemas import DashboardOut, PaymentItem, PaymentsListOut

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


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


@router.get("/me", response_model=DashboardOut)
async def get_me(
    db: AsyncIOMotorDatabase = Depends(get_db),
    user_id: Optional[str] = Depends(get_current_user_id),
):
    if not user_id:
        return DashboardOut(email="", plan="free", api_key=None, usage_count=0, payment_history=[])
    users = db["users"]
    doc = await users.find_one({"_id": user_id})
    if not doc:
        return DashboardOut(email="", plan="free", api_key=None, usage_count=0, payment_history=[])
    usage_count = await db["usage_logs"].count_documents({"user_id": user_id})
    cursor = db["payments"].find({"user_id": user_id}).sort("created_at", -1).limit(20)
    payment_history = []
    async for p in cursor:
        payment_history.append(PaymentItem(
            plan=p.get("plan", ""),
            amount=p.get("amount", 0),
            status=p.get("status", ""),
            razorpay_payment_id=p.get("razorpay_payment_id", ""),
            created_at=p.get("created_at"),
        ))
    return DashboardOut(
        email=doc.get("email", ""),
        plan=doc.get("plan", "free"),
        api_key=doc.get("api_key"),
        usage_count=usage_count,
        payment_history=payment_history,
    )


@router.get("/payments", response_model=PaymentsListOut)
async def list_payments(
    db: AsyncIOMotorDatabase = Depends(get_db),
    user_id: Optional[str] = Depends(get_current_user_id),
):
    if not user_id:
        return PaymentsListOut(payments=[])
    payments = []
    cursor = db["payments"].find({"user_id": user_id}).sort("created_at", -1)
    async for p in cursor:
        payments.append(PaymentItem(
            plan=p.get("plan", ""),
            amount=p.get("amount", 0),
            status=p.get("status", ""),
            razorpay_payment_id=p.get("razorpay_payment_id", ""),
            created_at=p.get("created_at"),
        ))
    return PaymentsListOut(payments=payments)
