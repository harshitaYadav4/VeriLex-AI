import secrets
from motor.motor_asyncio import AsyncIOMotorDatabase


def generate_api_key() -> str:
    suffix = secrets.token_urlsafe(24)
    return f"sk_verilex_{suffix}"


async def get_or_create_api_key(db: AsyncIOMotorDatabase, user_id: str) -> str:
    users = db["users"]
    doc = await users.find_one({"_id": user_id})
    if doc and doc.get("api_key"):
        return doc["api_key"]
    key = generate_api_key()
    await users.update_one(
        {"_id": user_id},
        {"$set": {"api_key": key}},
        upsert=True,
    )
    return key
