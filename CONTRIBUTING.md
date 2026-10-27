# Contributing to OpenAssess

Thank you for your interest in contributing to OpenAssess! This document outlines our branching conventions, development workflow, and coding standards.

---

## Git Branching Strategy

We follow a modified GitFlow branching model:

- **`main`**: Production-ready branch. Only tagged releases and stable merge commits land here. Protected against direct pushes.
- **`develop`**: The primary integration branch. Features, fixes, and phase tasks are merged here via Pull Requests.
- **`feature/<name>`**: Feature branches branched off `develop` (e.g., `feature/phase1-foundation`, `feature/jwt-authentication`).
- **`bugfix/<name>`**: Bug fixes addressing non-critical issues on `develop`.
- **`hotfix/<version>`**: Emergency fixes branched directly from `main`.

### Branch Naming Conventions
- `feature/<issue-or-phase>-<short-description>`
- `bugfix/<issue-number>-<short-description>`
- `docs/<short-description>`
- `refactor/<short-description>`

---

## Development Workflow

1. **Fork or Clone the Repository**:
   ```bash
   git clone https://github.com/OpenAssess/openassess.git
   cd openassess
   ```

2. **Create a Topic Branch**:
   ```bash
   git checkout -b feature/phase1-foundation
   ```

3. **Set Up Environments**:
   - Python virtual environment: `python -m venv .venv`
   - Node packages: `cd frontend && npm install`

4. **Code and Test**:
   - Ensure all backend unit tests pass: `pytest backend/tests`
   - Verify linting and formatting: `ruff check backend`
   - Verify frontend builds: `npm run build` inside `frontend/`

5. **Commit Conventions**:
   We follow [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: add health check and redis status endpoint`
   - `fix: correct database connection pool recycling`
   - `docs: update quickstart instructions in README`
   - `test: add unit tests for alembic migration runner`
   - `chore: update dependencies`

6. **Submit a Pull Request**:
   - Target `develop` branch.
   - Fill out the PR template completely.
   - Ensure all CI status checks (linting, tests, build) pass.

---

## Coding Standards

### Python & Backend
- Python 3.12+ / 3.14 compatible.
- PEP 8 compliance enforced via `ruff`.
- Explicit typing with Pydantic v2 and Python type annotations.
- Keep business logic separated from API routing and ORM layer.

### TypeScript & Frontend
- React 18/19 functional components with hooks.
- Strict TypeScript checks enabled (`strict: true` in `tsconfig.json`).
- Tailwind CSS utility classes with clean component modularity.
