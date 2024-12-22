from app.routers import user
from fastapi import FastAPI

app = FastAPI()

app.include_router(user.router)


@app.get("/")
def read_root():
    return {"message": "Welcome to the blog API!"}
