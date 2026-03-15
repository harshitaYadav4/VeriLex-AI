from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class User(BaseModel):
    email: EmailStr
    firebase_uid: str
    plan: str = "free"
    api_key: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class Payment(BaseModel):
    user_id: str
    plan: str
    amount: int  # paise
    razorpay_payment_id: str
    status: str = "success"
    created_at: datetime = Field(default_factory=datetime.utcnow)


class UsageLog(BaseModel):
    user_id: str
    api_key: str
    endpoint: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
