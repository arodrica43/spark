"""Flask application factory."""
import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_smorest import Api

from app.config import config
from app.extensions import db, redis_client


def create_app(config_name=None):
    """Create and configure the Flask application."""
    if config_name is None:
        config_name = os.getenv("FLASK_ENV", "development")

    app = Flask(__name__)
    app.config.from_object(config[config_name])

    # Initialize extensions
    db.init_app(app)
    CORS(app)
    Migrate(app, db)
    
    # Initialize API with OpenAPI support
    api = Api(app)

    # Initialize Redis
    redis_client.init_app(app)

    # Register blueprints
    from app.api import health_bp, items_bp
    
    api.register_blueprint(health_bp)
    api.register_blueprint(items_bp)

    # Create database tables
    with app.app_context():
        db.create_all()

    return app
