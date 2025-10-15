# Development Setup

## Prerequisites

Ensure you have the following installed:

- Docker Desktop (latest version)
- Docker Compose v2+
- Git
- Make
- (Optional) Node.js 20+ for local frontend development
- (Optional) Python 3.11+ for local backend development
- (Optional) Java 11+ and SBT for Spark development

## Initial Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/arodrica43/spark.git
   cd spark
   ```

2. **Copy environment file**:
   ```bash
   cp .env.example .env
   ```

3. **Install dependencies and pre-commit hooks**:
   ```bash
   make setup
   ```

## Development Workflow

### Start All Services

```bash
make dev
```

This starts:
- PostgreSQL on port 5432
- Redis on port 6379
- Backend API on port 5000
- Frontend on port 4200
- Spark Master on ports 7077, 8080

### Stop Services

```bash
make stop
```

### View Logs

```bash
make logs
```

## Local Development

### Backend Development

```bash
cd backend
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt -r requirements-dev.txt
flask run
```

### Frontend Development

```bash
cd frontend
npm install
npm start
```

### Spark Development

```bash
cd spark-jobs
sbt compile
sbt test
```

## Database Management

### Run Migrations

```bash
make migrate
```

### Create New Migration

```bash
make migrate-create message="description of changes"
```

### Seed Database

```bash
make seed
```

### Access PostgreSQL Shell

```bash
make shell-postgres
```

## Code Quality

### Run All Tests

```bash
make test
```

### Run Linters

```bash
make lint
```

### Format Code

```bash
make format
```

## Debugging

### Backend Shell

```bash
make shell-backend
```

### Frontend Shell

```bash
make shell-frontend
```

### View Container Logs

```bash
docker-compose logs -f [service-name]
```

## Hot Reload

All services support hot reload in development mode:

- **Backend**: Flask auto-reloads on code changes
- **Frontend**: Angular dev server auto-reloads
- **Spark**: Requires manual rebuild with `sbt compile`
