# Installation

## Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local frontend development)
- Python 3.11+ (for local backend development)
- SBT (for Spark jobs development)
- Make

## Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/arodrica43/spark.git
   cd spark
   ```

2. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

3. **Install dependencies**:
   ```bash
   make setup
   ```

4. **Start services**:
   ```bash
   make dev
   ```

## Verify Installation

- Frontend: http://localhost:4200
- Backend: http://localhost:5000/api/health/
- Swagger UI: http://localhost:5000/swagger-ui
- Spark UI: http://localhost:8080
