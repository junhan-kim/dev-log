from app.database import get_db
from app.dependencies.user import get_current_user
from app.schemas.auth import Token, UserLogin
from app.services import user_service
from app.utils.crypto import verify_password
from app.utils.jwt import create_access_token
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = user_service.read_user_by_username_for_auth(user.username, db)
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/profile")
def get_profile(current_user: str = Depends(get_current_user)):
    return {"message": f"Hello, {current_user}"}
