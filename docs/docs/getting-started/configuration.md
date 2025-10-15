# Configuration

## Environment Variables

The application uses environment variables for configuration following 12-factor app principles.

### Backend Configuration

- `FLASK_ENV`: Environment (development, testing, production)
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `SECRET_KEY`: Secret key for session management

### Frontend Configuration

- `NODE_ENV`: Environment (development, production)
- `API_URL`: Backend API URL

### Database Configuration

- `POSTGRES_USER`: Database user
- `POSTGRES_PASSWORD`: Database password
- `POSTGRES_DB`: Database name

### Spark Configuration

- `SPARK_MASTER_URL`: Spark master URL
- `SPARK_WORKER_CORES`: Number of CPU cores for worker
- `SPARK_WORKER_MEMORY`: Memory allocation for worker

## Configuration Files

- `.env`: Local environment variables (not committed)
- `.env.example`: Example environment file (committed)
- `backend/app/config.py`: Backend configuration classes
- `frontend/src/environments/`: Angular environment files
