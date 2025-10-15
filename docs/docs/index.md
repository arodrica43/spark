# Spark Application

Welcome to the Spark Application documentation. This application is a production-ready, full-stack solution featuring:

- **Frontend**: Angular 17
- **Backend**: Flask 3 with OpenAPI documentation
- **Data Processing**: Scala 2.12 / Apache Spark 3.5
- **Database**: PostgreSQL
- **Cache**: Redis
- **Deployment**: Docker, Docker Compose, Render.com

## Quick Start

```bash
# Clone the repository
git clone https://github.com/arodrica43/spark.git
cd spark

# Setup the environment
make setup

# Start all services
make dev
```

The application will be available at:
- Frontend: http://localhost:4200
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000/swagger-ui
- Spark Master UI: http://localhost:8080

## Features

- ✅ 12-factor app principles
- ✅ Environment-based configuration
- ✅ Database migrations with Alembic
- ✅ Comprehensive test coverage (≥85%)
- ✅ CI/CD with GitHub Actions
- ✅ Pre-commit hooks for code quality
- ✅ OpenAPI/Swagger documentation
- ✅ Docker and Docker Compose support
- ✅ Render.com deployment configuration
- ✅ MkDocs documentation site

## Architecture

The application follows a microservices architecture with:

1. **Angular Frontend**: Single-page application for user interface
2. **Flask Backend**: RESTful API with OpenAPI documentation
3. **Spark Jobs**: Data processing pipeline
4. **PostgreSQL**: Primary data store
5. **Redis**: Caching layer

All services are containerized and can be orchestrated with Docker Compose.

## Development

See the [Development Setup](development/setup.md) guide for detailed instructions on setting up your development environment.

## Deployment

The application is configured for deployment on Render.com. See the [Deployment](development/deployment.md) guide for details.
