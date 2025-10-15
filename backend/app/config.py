"""Application configuration."""
import os


class Config:
    """Base configuration."""

    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-change-in-production")
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL", "postgresql://sparkuser:sparkpass@localhost:5432/sparkdb"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

    # API Documentation
    API_TITLE = "Spark API"
    API_VERSION = "v1"
    OPENAPI_VERSION = "3.0.2"
    OPENAPI_URL_PREFIX = "/"
    OPENAPI_SWAGGER_UI_PATH = "/swagger-ui"
    OPENAPI_SWAGGER_UI_URL = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

    # CORS
    CORS_HEADERS = "Content-Type"


class DevelopmentConfig(Config):
    """Development configuration."""

    DEBUG = True
    TESTING = False


class TestingConfig(Config):
    """Testing configuration."""

    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    REDIS_URL = "redis://localhost:6379/1"


class ProductionConfig(Config):
    """Production configuration."""

    DEBUG = False
    TESTING = False
    # In production, ensure SECRET_KEY is set via environment variable


config = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}
