#!/bin/bash

echo "Generating Alembic migration..."

alembic revision --autogenerate -m "auto migration"
alembic upgrade head

exec "$@"
