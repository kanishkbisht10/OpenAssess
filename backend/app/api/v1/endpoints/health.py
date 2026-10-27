import time

import redis
from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.core.config import settings
from app.core.logging import logger
from app.schemas.health import HealthCheckResponse, ServiceStatus

router = APIRouter()


@router.get("/health", response_model=HealthCheckResponse, summary="Perform system health check")
def health_check(db: Session = Depends(get_db)) -> HealthCheckResponse:
    """Checks the operational status of FastAPI, PostgreSQL / SQLite, and Redis."""
    # 1. Check Database
    db_status = ServiceStatus(status="healthy")
    try:
        t0 = time.perf_counter()
        db.execute(text("SELECT 1"))
        db_status.latency_ms = round((time.perf_counter() - t0) * 1000, 2)
    except Exception as exc:
        logger.warning(f"Database health check failed: {exc}")
        db_status.status = "unreachable"
        db_status.error = str(exc)

    # 2. Check Redis
    redis_status = ServiceStatus(status="healthy")
    try:
        t0 = time.perf_counter()
        r = redis.Redis.from_url(
            settings.REDIS_URL,
            socket_connect_timeout=0.2,
            socket_timeout=0.2,
            retry=None,
            retry_on_timeout=False,
        )
        r.ping()
        redis_status.latency_ms = round((time.perf_counter() - t0) * 1000, 2)
    except Exception as exc:
        logger.warning(f"Redis health check failed: {exc}")
        redis_status.status = "unreachable"
        redis_status.error = str(exc)

    overall_status = "ok"
    if db_status.status != "healthy":
        overall_status = "degraded"

    return HealthCheckResponse(
        status=overall_status,
        app=settings.PROJECT_NAME,
        version=settings.VERSION,
        environment=settings.ENVIRONMENT,
        database=db_status,
        redis=redis_status,
    )
