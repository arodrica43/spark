# Architecture Overview

## System Components

The Spark application consists of five main components:

### 1. Frontend (Angular 17)

- **Technology**: Angular 17 with standalone components
- **Port**: 4200
- **Features**:
  - Single-page application (SPA)
  - Reactive forms
  - HTTP client for API communication
  - Component-based architecture
  - Lazy loading support

### 2. Backend (Flask 3)

- **Technology**: Flask 3 with Flask-Smorest
- **Port**: 5000
- **Features**:
  - RESTful API
  - OpenAPI/Swagger documentation
  - SQLAlchemy ORM
  - Alembic migrations
  - Redis caching
  - CORS support

### 3. Database (PostgreSQL 15)

- **Technology**: PostgreSQL 15
- **Port**: 5432
- **Features**:
  - ACID compliance
  - Robust indexing
  - Connection pooling
  - Backup and recovery

### 4. Cache (Redis 7)

- **Technology**: Redis 7
- **Port**: 6379
- **Features**:
  - In-memory data store
  - Pub/Sub messaging
  - Data persistence
  - Session storage

### 5. Data Processing (Spark 3.5)

- **Technology**: Apache Spark 3.5 with Scala 2.12
- **Ports**: 7077 (master), 8080 (web UI)
- **Features**:
  - Distributed data processing
  - DataFrame API
  - JDBC connectivity
  - Batch processing

## Data Flow

1. User interacts with Angular frontend
2. Frontend makes HTTP requests to Flask backend
3. Backend processes requests, queries PostgreSQL
4. Backend caches responses in Redis
5. Spark jobs periodically process data from PostgreSQL
6. Results are stored back in PostgreSQL

## Deployment Architecture

All components are containerized with Docker and orchestrated via Docker Compose or deployed individually on Render.com.
