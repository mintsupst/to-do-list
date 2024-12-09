"""Authentication routers."""
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.models.db import get_db
from app.schemas.user import UserCreate
from app.services.auth_service import (
    authenticate_user,
    create_access_token,
    register_user,
)

router = APIRouter()

@router.post("/register")
async def register(user: UserCreate, db: Annotated[Session, Depends(get_db)]):
    db_user = register_user(db, user)
    if not db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return {"message": "User registered successfully"}

@router.post("/login")
async def login(user: UserCreate, db: Annotated[Session, Depends(get_db)]):
    db_user = authenticate_user(db, user.username, user.password)
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": db_user.username, "user_id": db_user.id})
    return {"access_token": access_token, "token_type": "bearer"}

