import pytest
from app.database import Base, get_db
from app.main import app
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# DATABASE_URL = "sqlite:///:memory:"
DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db


@pytest.fixture(scope="module")
def client():
    Base.metadata.create_all(bind=engine)

    # 디버깅: 테이블 이름 출력
    from sqlalchemy import inspect
    inspector = inspect(engine)
    print("Tables:", inspector.get_table_names())  # 생성된 테이블 목록 확인

    with TestClient(app) as c:
        yield c
    Base.metadata.drop_all(bind=engine)
