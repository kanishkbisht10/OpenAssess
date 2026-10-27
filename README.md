# OpenAssess

OpenAssess is an open-source technical assessment and candidate evaluation platform built for engineering teams, educators, and hiring managers. It provides a modular, extensible foundation for authoring assessments, administering timed coding and multiple-choice questions (MCQ), and evaluating submissions.

---

## Architecture Overview

OpenAssess is built using a modern decoupled architecture:

- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.14 / 3.12+), asynchronous endpoints, Pydantic v2 settings & validation.
- **Database & ORM**: PostgreSQL with [SQLAlchemy 2.0](https://www.sqlalchemy.org/) and [Alembic](https://alembic.sqlalchemy.org/) migrations (with SQLite fallback for local test execution).
- **Task Broker & Cache**: [Redis](https://redis.io/) for session cache and asynchronous test evaluation queues.
- **Frontend**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), and [Tailwind CSS](https://tailwindcss.com/).
- **Evaluation Engine (Planned)**: Integration with Judge0 sandbox code execution for real-time code runs and automated unit test verification.

```
                    ┌────────────────────────┐
                    │    React + Vite SPA    │
                    │   (Candidate / Creator)│
                    └───────────┬────────────┘
                                │ HTTP / REST
                                ▼
                    ┌────────────────────────┐
                    │   FastAPI Backend API  │
                    │      (Port: 8000)      │
                    └──────┬────────────┬────┘
                           │            │
            SQLAlchemy 2.0 │            │ Redis Client
                           ▼            ▼
             ┌─────────────────┐   ┌─────────────────┐
             │ PostgreSQL 16   │   │   Redis 7       │
             │ (Data Store)    │   │ (Queue / Cache) │
             └─────────────────┘   └─────────────────┘
```

---

## Roadmap & PERT Phases

The platform is designed in 8 structured development phases:

1. **Phase 1: Foundation (Current)** - Repository setup, Docker Compose, FastAPI skeleton, SQLAlchemy/Alembic, CI pipeline, React/TS scaffold.
2. **Phase 2: Authentication** - User model, JWT auth, role-based access (Admin, Creator, Candidate), route guards.
3. **Phase 3: Assessments** - Assessment CRUD, MCQ and coding question schemas, creator UI with Monaco editor.
4. **Phase 4: Candidate Workflow** - Attempt models, timer enforcement, test-taking UI, answer submission.
5. **Phase 5: Evaluation** - MCQ scoring engine, Judge0 code execution service client, asynchronous Celery evaluation.
6. **Phase 6: Results** - Score aggregation, result breakdown, creator reporting, candidate feedback.
7. **Phase 7: Quality & Hardening** - Security audits, rate limiting, audit logging, load testing.
8. **Phase 8: Open-Source Release** - Community guides, demo data, deployment guides, release v0.1.

---

## Quickstart

### Prerequisites

- **Python**: 3.12 or newer (Python 3.14 supported)
- **Node.js**: 20+ (with npm)
- **Docker & Docker Compose** (optional for local multi-service orchestration)

### 1. Environment Setup

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 2. Backend Setup (Virtual Environment)

```bash
# Create and activate virtual environment
python -m venv .venv

# Windows PowerShell:
.\.venv\Scripts\Activate.ps1

# Linux / macOS:
source .venv/bin/activate

# Install dependencies
pip install -r backend/requirements.txt

# Run migrations
cd backend
alembic upgrade head

# Start FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The interactive OpenAPI docs will be available at: [http://localhost:8000/docs](http://localhost:8000/docs)
System health check: [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend application will be available at: [http://localhost:5173](http://localhost:5173)

### 4. Running with Docker Compose

To spin up all services (PostgreSQL, Redis, FastAPI Backend, and Frontend):

```bash
docker compose up --build
```

---

## Testing & Linting

### Backend

```bash
# Run test suite
pytest backend/tests

# Run linter
ruff check backend
```

### Frontend

```bash
cd frontend
npm run lint
npm run build
```

---

## Branching & Contribution

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, git branching model (`main`, `develop`, `feature/*`), and pull request procedures.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
