from pydantic import BaseModel
from typing import Optional

class UserCreateSchema(BaseModel):
    username: str
    password: str

class UserOutSchema(BaseModel):
    id: int
    username: str
    access_token: Optional[str]
    refresh_token: Optional[str]
    class Config:
        orm_mode = True

class TokenSchema(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class UserSignInSchema(BaseModel):
    username: str
    password: str