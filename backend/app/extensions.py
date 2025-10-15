"""Flask extensions initialization."""
from flask_sqlalchemy import SQLAlchemy
import redis

db = SQLAlchemy()


class RedisClient:
    """Redis client wrapper."""

    def __init__(self):
        self.client = None

    def init_app(self, app):
        """Initialize Redis connection."""
        redis_url = app.config["REDIS_URL"]
        self.client = redis.from_url(redis_url, decode_responses=True)

    def get(self, key):
        """Get value from Redis."""
        if self.client:
            return self.client.get(key)
        return None

    def set(self, key, value, ex=None):
        """Set value in Redis."""
        if self.client:
            return self.client.set(key, value, ex=ex)
        return None


redis_client = RedisClient()
