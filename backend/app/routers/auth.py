from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.database import get_db
from app.schemas import AuthSignup, AuthLogin
from app.services.api_key_service import get_or_create_api_key

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup")
async def signup(payload: AuthSignup, db: AsyncIOMotorDatabase = Depends(get_db)):
    users = db["users"]
    existing = await users.find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")
    from bson import ObjectId
    uid = str(ObjectId())
    await users.insert_one({
        "_id": uid,
        "email": payload.email,
        "firebase_uid": payload.firebase_uid,
        "plan": "free",
    })
    api_key = await get_or_create_api_key(db, uid)
    return {"email": payload.email, "plan": "free", "api_key": api_key}


@router.post("/login")
async def login(payload: AuthLogin, db: AsyncIOMotorDatabase = Depends(get_db)):
    users = db["users"]
    doc = await users.find_one({"email": payload.email})
    from bson import ObjectId
    if not doc:
        uid = str(ObjectId())
        await users.insert_one({
            "_id": uid,
            "email": payload.email,
            "firebase_uid": payload.firebase_uid,
            "plan": "free",
        })
        doc = await users.find_one({"_id": uid})
    uid = str(doc["_id"])
    api_key = await get_or_create_api_key(db, uid)
    return {
        "email": doc["email"],
        "plan": doc.get("plan", "free"),
        "api_key": api_key,
    }
