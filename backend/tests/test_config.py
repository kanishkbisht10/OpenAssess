from app.core.config import Settings


def test_default_settings():
    settings = Settings()
    assert settings.PROJECT_NAME == "OpenAssess"
    assert settings.VERSION == "0.1.0"
    assert settings.API_V1_STR == "/api/v1"
    assert isinstance(settings.BACKEND_CORS_ORIGINS, list)
    assert len(settings.BACKEND_CORS_ORIGINS) > 0


def test_cors_origin_parsing():
    settings = Settings(BACKEND_CORS_ORIGINS="http://test.com, https://test2.com")
    assert "http://test.com" in settings.BACKEND_CORS_ORIGINS
    assert "https://test2.com" in settings.BACKEND_CORS_ORIGINS
