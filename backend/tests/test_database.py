from sqlalchemy import Integer, text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base_class import Base


class ExampleModel(Base):
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)


def test_base_class_tablename():
    assert ExampleModel.__tablename__ == "example_model"


def test_db_session_exec(db_session):
    result = db_session.execute(text("SELECT 42")).scalar()
    assert result == 42
