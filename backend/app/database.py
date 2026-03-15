from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
MONGO_DB = os.getenv("MONGO_DB", "verilex")

_client = None
_db = None


def get_client():
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(MONGO_URI)
    return _client


def get_db():
    global _db
    if _db is None:
        _db = get_client()[MONGO_DB]
    return _db
