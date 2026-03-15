from typing import Optional, List
from pydantic import BaseModel, EmailStr
from datetime import datetime


class AuthSignup(BaseModel):
    email: EmailStr
    firebase_uid: str


class AuthLogin(AuthSignup):
    pass


class CreateOrderIn(BaseModel):
    plan: str  # free | pro | enterprise


class CreateOrderOut(BaseModel):
    amount: int
    currency: str = "INR"
    razorpay_order_id: str


class PaymentSuccessIn(BaseModel):
    razorpay_payment_id: Optional[str] = None
    razorpay_order_id: Optional[str] = None
    razorpay_signature: Optional[str] = None
    plan: str
    activate_free: bool = False


class PaymentSuccessOut(BaseModel):
    status: str = "success"
    plan: str
    api_key: Optional[str] = None


class PaymentItem(BaseModel):
    plan: str
    amount: int
    status: str
    razorpay_payment_id: str
    created_at: datetime


class DashboardOut(BaseModel):
    email: str
    plan: str
    api_key: Optional[str] = None
    usage_count: int = 0
    payment_history: List[PaymentItem] = []


class PaymentsListOut(BaseModel):
    payments: List[PaymentItem]
