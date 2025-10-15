# Backend Architecture

## Technology Stack

- **Framework**: Flask 3
- **ORM**: SQLAlchemy
- **Migrations**: Alembic
- **API Documentation**: Flask-Smorest (OpenAPI 3.0)
- **Database**: PostgreSQL
- **Cache**: Redis

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # Application factory
│   ├── config.py            # Configuration classes
│   ├── extensions.py        # Flask extensions
│   ├── api/
│   │   └── __init__.py      # API routes and blueprints
│   ├── models/
│   │   └── __init__.py      # Database models
│   └── services/
│       └── __init__.py      # Business logic
├── tests/
│   ├── conftest.py          # Test fixtures
│   ├── test_health.py
│   ├── test_items.py
│   └── test_models.py
├── scripts/
│   ├── init.sql             # Database initialization
│   └── seed_data.py         # Seed script
├── alembic/
│   ├── env.py               # Alembic configuration
│   └── versions/            # Migration files
├── requirements.txt         # Dependencies
├── requirements-dev.txt     # Dev dependencies
└── Dockerfile               # Container definition
```

## Key Components

### Application Factory

The `create_app()` function in `main.py` initializes:
- Flask application
- Database connection
- Redis connection
- API blueprints
- CORS
- OpenAPI documentation

### Configuration

Three environment-specific configs in `config.py`:
- `DevelopmentConfig`: Debug mode, verbose logging
- `TestingConfig`: In-memory SQLite, isolated tests
- `ProductionConfig`: Optimized for production

### Models

SQLAlchemy models define database schema:
- Base class with common fields
- Relationships defined via ORM
- Methods for serialization

### API Blueprints

Flask-Smorest blueprints provide:
- Route grouping
- Automatic OpenAPI generation
- Request/response validation
- Schema serialization

### Extensions

Centralized extension initialization:
- Database (SQLAlchemy)
- Redis client wrapper
- Migrations (Alembic)

## Database Design

### Items Table

```sql
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Migrations

Alembic manages schema changes:
```bash
flask db migrate -m "description"
flask db upgrade
```

## API Design

### RESTful Endpoints

- `GET /api/items/`: List items
- `GET /api/items/{id}`: Get item
- `POST /api/items/`: Create item
- `PUT /api/items/{id}`: Update item
- `DELETE /api/items/{id}`: Delete item

### Request/Response Format

JSON with consistent structure:
```json
{
  "id": 1,
  "name": "Item Name",
  "description": "Description",
  "created_at": "2024-01-01T00:00:00",
  "updated_at": "2024-01-01T00:00:00"
}
```

## Caching Strategy

Redis caches:
- Item lookups (5-minute TTL)
- Session data
- Rate limiting counters

## Error Handling

Consistent error responses:
```json
{
  "message": "Error description",
  "status": 404
}
```

## Testing

- Unit tests for models
- Integration tests for API endpoints
- Fixtures for test data
- Coverage reporting

## Security

- Environment-based secrets
- CORS configuration
- Input validation
- SQL injection prevention (ORM)
