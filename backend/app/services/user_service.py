from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from fastapi import HTTPException
from sqlalchemy.orm import Session


def create_user_service(user: UserCreate, db: Session) -> UserResponse:
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = User(
        username=user.username,
        email=user.email,
        hashed_password=user.password,  # Note: Password should be hashed
        full_name=user.full_name,
        is_active=user.is_active,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def read_user_service(user_id: int, db: Session) -> UserResponse:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


def read_users_service(skip: int, limit: int, db: Session) -> list[UserResponse]:
    users = db.query(User).offset(skip).limit(limit).all()
    return users


def update_user_service(user_id: int, user: UserCreate, db: Session) -> UserResponse:
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db_user.username = user.username
    db_user.email = user.email
    db_user.full_name = user.full_name
    db_user.is_active = user.is_active
    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user_service(user_id: int, db: Session) -> dict:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted successfully"}
