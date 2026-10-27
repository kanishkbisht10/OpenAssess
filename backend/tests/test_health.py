from unittest.mock import patch

from app.api.v1.endpoints.health import health_check


def test_health_check_endpoint_healthy(db_session):
    with patch("redis.Redis.from_url") as mock_redis:
        mock_instance = mock_redis.return_value
        mock_instance.ping.return_value = True

        response = health_check(db=db_session)
        assert response.status == "ok"
        assert response.app == "OpenAssess"
        assert response.version == "0.1.0"
        assert response.database.status == "healthy"
        assert response.redis.status == "healthy"


def test_health_check_endpoint_redis_unreachable(db_session):
    with patch("redis.Redis.from_url") as mock_redis:
        mock_instance = mock_redis.return_value
        mock_instance.ping.side_effect = ConnectionError("Redis is unreachable")

        response = health_check(db=db_session)
        assert response.status == "ok"
        assert response.redis.status == "unreachable"
        assert "Redis is unreachable" in response.redis.error
