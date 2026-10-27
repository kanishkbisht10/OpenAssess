from datetime import UTC, datetime

from pydantic import BaseModel, Field


class ServiceStatus(BaseModel):
    status: str = Field(description="Operational status: healthy, degraded, or unreachable")
    latency_ms: float | None = Field(default=None, description="Response latency in milliseconds")
    error: str | None = Field(default=None, description="Error message if unhealthy")


class HealthCheckResponse(BaseModel):
    status: str = Field(default="ok", description="Overall system health status")
    app: str = Field(description="Application name")
    version: str = Field(description="Application version")
    environment: str = Field(description="Active environment")
    database: ServiceStatus = Field(description="Database connectivity status")
    redis: ServiceStatus = Field(description="Redis cache connectivity status")
    timestamp: datetime = Field(
        default_factory=lambda: datetime.now(UTC),
        description="Current server UTC timestamp",
    )
