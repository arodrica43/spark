# Deployment Guide

## Render.com Deployment

The application is configured for one-click deployment on Render.com.

### Prerequisites

- GitHub account
- Render.com account
- Repository pushed to GitHub

### Deployment Steps

1. **Connect Repository**:
   - Go to https://render.com
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will detect `infra/render.yaml`

2. **Configure Environment**:
   - Review auto-generated environment variables
   - Update `SECRET_KEY` to a secure random value
   - Configure custom domain (optional)

3. **Deploy**:
   - Click "Apply"
   - Wait for all services to deploy
   - Services will be available at assigned URLs

### Service Configuration

The `infra/render.yaml` defines:

- **PostgreSQL Database**: Persistent storage with 10GB disk
- **Redis Cache**: In-memory cache with 1GB disk
- **Backend API**: Flask application (web service)
- **Frontend**: Angular application (web service)
- **Spark Master**: Spark master node (private service)
- **Spark Worker**: Spark worker node (private service)

### Environment Variables

Required variables are automatically configured:
- Database connection strings
- Redis URL
- Inter-service URLs
- Auto-generated secrets

### Monitoring

- View logs in Render dashboard
- Set up alerts for service health
- Monitor resource usage

## Docker Deployment

### Build Images

```bash
make build
```

### Run with Docker Compose

```bash
docker-compose up -d
```

### Access Services

- Frontend: http://localhost:4200
- Backend: http://localhost:5000
- Spark UI: http://localhost:8080

## Manual Deployment

### Backend

```bash
cd backend
pip install -r requirements.txt
gunicorn --bind 0.0.0.0:5000 app.main:create_app()
```

### Frontend

```bash
cd frontend
npm install
npm run build:prod
# Serve dist/spark-frontend with nginx or similar
```

### Spark

```bash
cd spark-jobs
sbt assembly
spark-submit --class com.spark.jobs.DataProcessor \
  target/scala-2.12/spark-jobs-1.0.0.jar
```

## Production Checklist

- [ ] Set strong `SECRET_KEY`
- [ ] Configure HTTPS/SSL
- [ ] Set up database backups
- [ ] Configure monitoring and alerting
- [ ] Review and set resource limits
- [ ] Configure CORS for production domains
- [ ] Set up log aggregation
- [ ] Configure rate limiting
- [ ] Review security headers
- [ ] Set up CI/CD pipeline

## Scaling

### Horizontal Scaling

- Add more Spark workers
- Scale backend replicas
- Add read replicas for PostgreSQL

### Vertical Scaling

- Increase service plan on Render
- Adjust worker memory/cores
- Increase database size

## Troubleshooting

### Service Won't Start

- Check logs in Render dashboard
- Verify environment variables
- Check service dependencies

### Database Connection Issues

- Verify DATABASE_URL format
- Check PostgreSQL service health
- Verify network connectivity

### Performance Issues

- Monitor resource usage
- Check database query performance
- Review Redis cache hit rates
- Scale services as needed
