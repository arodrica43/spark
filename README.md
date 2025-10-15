# Spark - Production-Ready Full-Stack Application

[![CI](https://github.com/arodrica43/spark/workflows/CI/badge.svg)](https://github.com/arodrica43/spark/actions)
[![codecov](https://codecov.io/gh/arodrica43/spark/branch/main/graph/badge.svg)](https://codecov.io/gh/arodrica43/spark)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

A production-ready, full-stack application featuring Angular 17, Flask 3, Apache Spark 3.5, PostgreSQL, and Redis. Designed for deployment on Render.com with comprehensive CI/CD, testing, and documentation.

## 🚀 Features

- **Frontend**: Angular 17 with standalone components
- **Backend**: Flask 3 with OpenAPI/Swagger documentation
- **Data Processing**: Scala 2.12 / Apache Spark 3.5
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Infrastructure**: Docker, Docker Compose, Render.com
- **CI/CD**: GitHub Actions with automated testing
- **Code Quality**: Pre-commit hooks, linting, formatting
- **Documentation**: MkDocs with Material theme
- **Testing**: ≥85% code coverage
- **12-Factor App**: Environment-based configuration

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local frontend development)
- Python 3.11+ (for local backend development)
- Java 11+ and SBT (for Spark jobs)
- Make

## 🛠️ Quick Start

### 1. Clone and Setup

```bash
git clone https://github.com/arodrica43/spark.git
cd spark
make setup
```

### 2. Start All Services

```bash
make dev
```

### 3. Access the Application

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/swagger-ui
- **Spark Master UI**: http://localhost:8080

## 📚 Available Commands

```bash
make help          # Show all available commands
make setup         # Initial setup - install dependencies
make dev           # Start all services in development mode
make test          # Run all tests
make lint          # Run all linters
make format        # Format all code
make build         # Build all services
make clean         # Clean up containers and files
make migrate       # Run database migrations
make seed          # Seed database with initial data
make docs          # Build documentation
make docs-serve    # Serve documentation locally
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Browser                       │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    Angular 17 Frontend                       │
│                    (Port 4200)                               │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    Flask 3 Backend API                       │
│                    (Port 5000)                               │
└────────────┬────────────────────────┬───────────────────────┘
             │                        │
             ▼                        ▼
┌────────────────────┐    ┌──────────────────────────┐
│   PostgreSQL 15    │    │       Redis 7            │
│   (Port 5432)      │    │       (Port 6379)        │
└────────────────────┘    └──────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────┐
│                    Apache Spark 3.5                          │
│            Master (Port 7077, 8080)                          │
│            Worker                                            │
└─────────────────────────────────────────────────────────────┘
```

## 🧪 Testing

### Run All Tests

```bash
make test
```

### Run Specific Tests

```bash
make test-backend   # Backend tests only
make test-frontend  # Frontend tests only
make test-spark     # Spark job tests only
```

### Test Coverage

The project maintains ≥85% test coverage:

- Backend: pytest with coverage reporting
- Frontend: Jasmine/Karma with coverage
- Spark: ScalaTest

## 🎨 Code Quality

### Pre-commit Hooks

```bash
make install-hooks
```

This installs hooks for:
- Trailing whitespace removal
- End-of-file fixing
- YAML/JSON validation
- Python: Black, Flake8, isort, mypy
- TypeScript: Prettier, ESLint

### Linting

```bash
make lint    # Run all linters
make format  # Auto-format code
```

## 📦 Deployment

### Deploy to Render.com

1. Push your code to GitHub
2. Connect your repository to Render
3. Render will automatically detect `infra/render.yaml`
4. All services will be deployed with proper configuration

### Manual Docker Build

```bash
make build
docker-compose up -d
```

## 🔧 Configuration

All configuration follows 12-factor app principles using environment variables.

Copy `.env.example` to `.env` and customize:

```bash
cp .env.example .env
```

Key variables:
- `FLASK_ENV`: development/testing/production
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `SECRET_KEY`: Flask secret key (change in production!)

## 📖 Documentation

### View Documentation

```bash
make docs-serve
```

Visit http://localhost:8000

### Build Documentation

```bash
make docs
```

Documentation includes:
- Getting Started Guide
- Architecture Overview
- API Reference
- Development Guide
- Deployment Instructions

## 🔐 Security

- Secrets managed via environment variables
- Database credentials not committed
- Pre-commit hooks prevent private key commits
- HTTPS enforced in production (Render.com)
- CORS configured for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Install pre-commit hooks: `make install-hooks`
4. Make your changes
5. Run tests: `make test`
6. Run linters: `make lint`
7. Submit a pull request

## 📝 License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Services won't start

```bash
make clean
make dev
```

### Database connection issues

Ensure PostgreSQL is healthy:
```bash
docker-compose ps postgres
```

### Port conflicts

Check if ports are in use:
```bash
lsof -i :4200  # Frontend
lsof -i :5000  # Backend
lsof -i :5432  # PostgreSQL
```

## 📞 Support

- Documentation: http://localhost:8000 (after `make docs-serve`)
- Issues: https://github.com/arodrica43/spark/issues
- API Docs: http://localhost:5000/swagger-ui

## 🎯 Roadmap

- [ ] Add Kubernetes deployment manifests
- [ ] Implement authentication with JWT
- [ ] Add WebSocket support for real-time updates
- [ ] Enhanced monitoring with Prometheus/Grafana
- [ ] Multi-language support (i18n)
