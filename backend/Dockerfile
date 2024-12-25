FROM python:3.11-slim

WORKDIR /app

# Poetry 설치
RUN apt-get update && apt-get install -y curl && \
    curl -sSL https://install.python-poetry.org | python3 - && \
    apt-get clean

ENV PATH="/root/.local/bin:$PATH"
ENV POETRY_VIRTUALENVS_CREATE=false

COPY pyproject.toml ./
RUN poetry lock && poetry install --no-root

COPY . .

# ruff 실행 (릴리즈 단계에서는 주석 처리 가능)
RUN poetry run ruff check . --fix

COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
