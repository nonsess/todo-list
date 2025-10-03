import fastapi
from fastapi import APIRouter, Depends, HTTPException, Form
from fastapi.security import OAuth2PasswordRequestForm
import requests
from db.get_connection import get_session
from db.models import User
from help_stuff.auth import create_access_token, create_refresh_token, authenticate_user
from schemas.auth_schemas import UserCreateSchema, UserOutSchema, TokenSchema, UserSignInSchema
from fastapi import Request, Response

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/sign-up", status_code=201)
async def sign_up(request: Request, user_data: UserCreateSchema, db=Depends(get_session)):
    if not user_data.username or not user_data.password:
        raise HTTPException(status_code=400, detail="Username and password are required")
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
    

@router.post("/sign-in")
async def sign_in(user_data: UserSignInSchema, request: Request = None, db=Depends(get_session)) -> Response:
    user = db.query(User).filter(User.username == user_data.username).first()
    if not user or user.password != user_data.password:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    access_token = create_access_token(data={"sub": user.username})
    refresh_token = create_refresh_token(data={"sub": user.username})
    user.access_token = access_token
    user.refresh_token = refresh_token
    db.commit()
    return {"message": "User signed in succesfully", "access_token": access_token, "refresh_token": refresh_token}

@router.post("/sign-out")
async def sign_out(request: Request = None, db=Depends(get_session), user_data: UserOutSchema = Depends()) -> Response:
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