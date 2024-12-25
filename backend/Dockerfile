FROM python:3.11-slim

WORKDIR /app

# Poetry 설치
RUN apt-get update && apt-get install -y curl && \
    curl -sSL https://install.python-poetry.org | python3 - && \
    apt-get clean

ENV POETRY_VIRTUALENVS_CREATE=false

COPY pyproject.toml ./

RUN /root/.local/bin/poetry lock && \
    /root/.local/bin/poetry install --no-root

COPY . .

COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]
