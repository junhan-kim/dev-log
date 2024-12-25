#!/bin/sh

# 마이그레이션 적용
until alembic upgrade head; do
  echo "Waiting for database to be ready for upgrade..."
  sleep 2
done

# 테스트 실행
echo "Running tests with pytest..."
pytest --disable-warnings
if [ $? -ne 0 ]; then
  echo "Tests failed. Exiting."
  exit 1
fi

# FastAPI 서버 실행
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
