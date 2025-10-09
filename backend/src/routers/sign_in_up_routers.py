from fastapi import APIRouter, Depends, HTTPException, Request, Response, Header
from src.db.get_connection import get_session
from src.db.models import User
from src.help_stuff.auth import create_access_token, create_refresh_token, is_token_expired
from src.schemas.auth_schemas import UserCreateSchema, UserOutSchema, UserSignInSchema
from typing import Annotated
import re

router = APIRouter()


@router.post("/auth/sign-up", status_code=201)
async def sign_up(request: Request, user_data: UserCreateSchema, db=Depends(get_session)):
    if not user_data.username or not user_data.password:
        raise HTTPException(status_code=400, detail="Username and password are required")
    if len(user_data.username) > 50 or len(user_data.password) > 100 or  len(re.findall(pattern=r"[А-Яа-яёЁ]+", string=user_data.username)):
        raise HTTPException(status_code=400, detail="Invalid username or password")
    existing_user = db.query(User).filter(User.username == user_data.username).first()
    if existing_user:
        raise HTTPException(status_code=409, detail="Username already exists")
    user = User(username=user_data.username, password=user_data.password)
    access_token = create_access_token(data={"sub": user.username})
    refresh_token = create_refresh_token(data={"sub": user.username})
    user.access_token = access_token
    user.refresh_token = refresh_token
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User created successfully", "user_id": user.id, "access_token": access_token, "refresh_token": refresh_token}
    

@router.post("/auth/sign-in")
async def sign_in(user_data: UserSignInSchema, request: Request = None, db=Depends(get_session)) -> dict:
    user = db.query(User).filter(User.username == user_data.username).first()
    if not user or user.password != user_data.password:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    access_token = create_access_token(data={"sub": user.username})
    refresh_token = create_refresh_token(data={"sub": user.username})
    user.access_token = access_token
    user.refresh_token = refresh_token
    db.commit()
    return {"message": "User signed in succesfully", "access_token": access_token, "refresh_token": refresh_token}

@router.post("/auth/sign-out")
async def sign_out(request: Request = None, db=Depends(get_session), user_data: UserOutSchema = Depends()) -> dict:
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    token = auth_header.split(" ")[1]
    user = db.query(User).filter(User.access_token == token).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    user.access_token = None
    user.refresh_token = None
    db.commit()
    return Response({"message": "Signed out successfully"})

"""TODO: user/me endpoint to get user info based on access token."""
@router.get("/users/me")
async def profile(request: Request = None, db=Depends(get_session), access_token: Annotated[str | None, Header()] = None) -> dict:
    token = access_token
    if not token:
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    if is_token_expired(token):
        raise HTTPException(status_code=401, detail="Token is expired")
    user = db.query(User).filter(User.access_token == token).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    return {"username": user.username}

"""TODO: refresh token endpoint to get new access token using refresh token."""
@router.post("/auth/refresh_token")
async def refresh(request: Request = None, db=Depends(get_session), access_token: Annotated[str | None, Header()] = None) -> dict:
    token = access_token
    if not token:
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    if is_token_expired(token):
        raise HTTPException(status_code=401, detail="Token is expired")
    user = db.query(User).filter(User.refresh_token == token).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    new_access_token = create_access_token(data={"sub": user.username,})
    user.access_token = new_access_token
    db.commit()
    return {"message": "User signed in succesfully", "access_token": new_access_token, "refresh_token": token}