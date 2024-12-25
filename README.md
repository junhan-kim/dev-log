# 개요
개인 블로그 만들기

# 목표
### backend 위주로 작업
frontend는 간단하게
### 어려운 기술 사용보다는 기본적인 사항에 집중
일반적인 구조, 기본적인 기능에 집중

나중에 다른 프로젝트의 템플릿, 스니펫으로 사용할 수 있도록

# 작업 절차
- ERD 업데이트
- API 작성
- 테스트 코드 작성


# 기술 스택
## 백엔드
- 환경: docker, docker-compose
- 서버 프레임워크: FastAPI
- DB: PostgresDB
- Cache: Valkey
- Queue: RabbitMQ
- Long running task: Celery
- Log: fluentd
- 패키지 매니징: Poetry
- 린터: Ruff
- 코드 버전 관리: Git

## 프론트엔드
- 프레임워크: React
