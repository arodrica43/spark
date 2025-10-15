# Project Summary

## Overview

This repository contains a production-ready, full-stack application with the following components:

- **Frontend**: Angular 17 with standalone components
- **Backend**: Flask 3 with OpenAPI documentation
- **Data Processing**: Apache Spark 3.5 with Scala 2.12
- **Database**: PostgreSQL 15
- **Cache**: Redis 7

## Test Coverage

### Backend (Flask)
- **Coverage**: 96%
- **Tests**: 14 passing
- **Framework**: pytest
- **Location**: `backend/tests/`

### Frontend (Angular)
- **Coverage**: 96.82%
- **Tests**: 22 passing
- **Framework**: Jasmine/Karma
- **Location**: `frontend/src/app/**/*.spec.ts`

### Spark Jobs (Scala)
- **Framework**: ScalaTest
- **Location**: `spark-jobs/src/test/`

## Key Features

✅ **12-Factor App Compliance**
- Environment-based configuration
- Externalized secrets
- Stateless processes
- Disposability via Docker

✅ **Quality Assurance**
- Pre-commit hooks for code quality
- Automated linting (flake8, black, prettier, eslint)
- Automated testing with >95% coverage
- CI/CD with GitHub Actions

✅ **Documentation**
- Comprehensive README
- MkDocs documentation site
- OpenAPI/Swagger API documentation
- Architecture diagrams and guides

✅ **Deployment**
- Docker and Docker Compose support
- Render.com configuration (infra/render.yaml)
- Multi-stage Docker builds
- Health checks for all services

✅ **Development Experience**
- Makefile with common commands
- VS Code devcontainer support
- Hot reload for all services
- Comprehensive test suites

## Quick Start

```bash
# Clone and setup
git clone https://github.com/arodrica43/spark.git
cd spark
make setup

# Start all services
make dev

# Run tests
make test

# View documentation
make docs-serve
```

## Services

| Service | Port | URL |
|---------|------|-----|
| Frontend | 4200 | http://localhost:4200 |
| Backend API | 5000 | http://localhost:5000 |
| API Docs | 5000 | http://localhost:5000/swagger-ui |
| PostgreSQL | 5432 | localhost:5432 |
| Redis | 6379 | localhost:6379 |
| Spark Master UI | 8080 | http://localhost:8080 |

## Technology Stack

### Frontend
- Angular 17.0.0
- TypeScript 5.2.2
- RxJS 7.8.0
- SCSS for styling
- Jasmine/Karma for testing

### Backend
- Flask 3.0.0
- SQLAlchemy 3.1.1
- Alembic 1.13.0
- Flask-Smorest 0.42.3 (OpenAPI)
- pytest 7.4.3

### Data Processing
- Apache Spark 3.5.0
- Scala 2.12.18
- SBT 1.9.7
- ScalaTest 3.2.17

### Infrastructure
- Docker & Docker Compose
- PostgreSQL 15
- Redis 7
- Nginx (for frontend production)

## Development Tools

- **Linting**: flake8, black, mypy, eslint, prettier, scalafmt
- **Testing**: pytest, Jasmine/Karma, ScalaTest
- **CI/CD**: GitHub Actions
- **Documentation**: MkDocs with Material theme
- **Pre-commit**: Automated code quality checks

## Code Quality Metrics

| Metric | Backend | Frontend |
|--------|---------|----------|
| Test Coverage | 96% | 96.82% |
| Tests Passing | 14/14 | 22/22 |
| Linting | ✅ Pass | ✅ Pass |
| Build | ✅ Pass | ✅ Pass |

## Deployment Options

### Local Development
```bash
make dev
```

### Docker Compose
```bash
docker compose up
```

### Render.com
Push to GitHub and connect repository to Render. The `infra/render.yaml` will be automatically detected.

## Environment Variables

All configuration is externalized via environment variables. See `.env.example` for available options.

Key variables:
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `SECRET_KEY`: Flask secret key
- `FLASK_ENV`: Environment (development/production)

## API Documentation

Interactive API documentation available at:
- Swagger UI: http://localhost:5000/swagger-ui

## Contributing

1. Fork the repository
2. Create a feature branch
3. Install pre-commit hooks: `make install-hooks`
4. Make changes and ensure tests pass: `make test`
5. Ensure linting passes: `make lint`
6. Submit a pull request

## License

Apache License 2.0 - See LICENSE file for details.

## Support

- Documentation: Run `make docs-serve` and visit http://localhost:8000
- Issues: https://github.com/arodrica43/spark/issues
