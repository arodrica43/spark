# 12-Factor App Compliance

This document verifies compliance with the [12-Factor App](https://12factor.net/) methodology.

## I. Codebase

✅ **Compliant**

- Single codebase tracked in Git
- Multiple deployments (development, testing, production)
- Same codebase deployed to all environments

**Implementation:**
- GitHub repository: https://github.com/arodrica43/spark
- Docker images built from same codebase
- Environment-specific configuration via environment variables

## II. Dependencies

✅ **Compliant**

- All dependencies explicitly declared and isolated
- No system-wide packages required

**Implementation:**

**Backend:**
- `requirements.txt`: Pinned versions (Flask==3.0.0, SQLAlchemy==3.1.1)
- `requirements-dev.txt`: Development dependencies
- Virtual environment isolation

**Frontend:**
- `package.json`: Pinned versions (@angular/core@^17.0.0)
- `package-lock.json`: Locked dependency tree
- node_modules isolation

**Spark:**
- `build.sbt`: Pinned versions (Spark 3.5.0, Scala 2.12.18)
- SBT manages dependencies

## III. Config

✅ **Compliant**

- Configuration stored in environment variables
- No config in code
- Different configs per environment

**Implementation:**
- `.env.example`: Template for environment variables
- `backend/app/config.py`: Environment-based configuration classes
- `frontend/src/environments/`: Environment files
- All secrets via environment variables (SECRET_KEY, DATABASE_URL)

## IV. Backing Services

✅ **Compliant**

- Backing services treated as attached resources
- Connection via URLs in environment variables
- Easy to swap implementations

**Implementation:**
- PostgreSQL: `DATABASE_URL` environment variable
- Redis: `REDIS_URL` environment variable
- Can switch databases without code changes
- Services defined in docker-compose.yml

## V. Build, Release, Run

✅ **Compliant**

- Strict separation between build, release, and run stages

**Implementation:**

**Build Stage:**
- Docker images built with `docker build`
- Frontend: `npm run build`
- Backend: Python bytecode compilation
- Spark: `sbt assembly`

**Release Stage:**
- Docker images tagged with version
- Environment variables injected
- Release artifacts stored in Docker registry

**Run Stage:**
- `docker-compose up` or `make dev`
- No code modifications at runtime
- Configuration via environment

## VI. Processes

✅ **Compliant**

- App executes as stateless processes
- No sticky sessions
- Data persisted in backing services

**Implementation:**
- Flask backend is stateless
- Angular frontend is stateless
- Session data in Redis
- Files in PostgreSQL/object storage
- Spark jobs process data and exit

## VII. Port Binding

✅ **Compliant**

- Services export HTTP via port binding
- Self-contained, no web server dependency

**Implementation:**
- Backend: Flask listens on port 5000
- Frontend: Angular dev server on 4200, nginx on 80 in production
- Spark Master: Port 7077 (RPC), 8080 (UI)
- PostgreSQL: Port 5432
- Redis: Port 6379

## VIII. Concurrency

✅ **Compliant**

- Scale out via process model
- Processes are first-class citizens

**Implementation:**
- Docker Compose can scale services: `docker-compose up --scale backend=3`
- Gunicorn workers for backend concurrency
- Spark workers for distributed processing
- Stateless design enables horizontal scaling

## IX. Disposability

✅ **Compliant**

- Fast startup and graceful shutdown
- Processes are disposable

**Implementation:**
- Docker containers start in seconds
- Graceful shutdown handlers
- Health checks ensure readiness
- Spark jobs handle interruption
- Database transactions ensure consistency

## X. Dev/Prod Parity

✅ **Compliant**

- Development and production as similar as possible
- Same backing services
- Continuous deployment

**Implementation:**
- Docker ensures environment consistency
- Same PostgreSQL version in dev and prod
- Same Redis version in dev and prod
- CI/CD pipeline with GitHub Actions
- docker-compose for local development
- Same images deployed to Render.com

## XI. Logs

✅ **Compliant**

- Logs as event streams
- App doesn't manage log files
- Logs to stdout/stderr

**Implementation:**
- Flask logs to stdout
- Angular logs to console
- Docker captures stdout/stderr
- `docker-compose logs` for viewing
- Structured logging available

## XII. Admin Processes

✅ **Compliant**

- Admin tasks run as one-off processes
- Same environment as regular processes

**Implementation:**
- Database migrations: `make migrate`
- Seed data: `make seed`
- Shell access: `make shell-backend`, `make shell-postgres`
- Spark jobs as batch processes
- All use same Docker environment

## Summary

✅ **All 12 factors implemented**

The application follows all twelve factors of the 12-Factor App methodology:

1. ✅ Single codebase in version control
2. ✅ Dependencies explicitly declared and isolated
3. ✅ Configuration in environment variables
4. ✅ Backing services as attached resources
5. ✅ Build, release, run stages separated
6. ✅ Stateless processes
7. ✅ Services export via port binding
8. ✅ Concurrency via process model
9. ✅ Fast startup, graceful shutdown
10. ✅ Dev/prod parity maintained
11. ✅ Logs as event streams
12. ✅ Admin processes as one-off tasks

## Verification

Run the following to verify:

```bash
# Check environment configuration
cat .env.example

# Verify dependencies
cat backend/requirements.txt
cat frontend/package.json
cat spark-jobs/build.sbt

# Test startup time
time docker-compose up -d

# Check logs
docker-compose logs

# Run admin task
make migrate
make seed
```
