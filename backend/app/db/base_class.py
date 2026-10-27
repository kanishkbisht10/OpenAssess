from datetime import datetime, timezone
from typing import Any
from sqlalchemy import DateTime, Integer
from sqlalchemy.orm import DeclarativeBase, Mapped, declared_attr, mapped_column


class Base(DeclarativeBase):
    id: Any
    __name__: str

    # Generate __tablename__ automatically from class name (snake_case)
    @declared_attr.directive
    def __tablename__(cls) -> str:
        name = cls.__name__
        # Convert PascalCase to snake_case
        return "".join(["_" + c.lower() if c.isupper() else c for c in name]).lstrip("_")

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
