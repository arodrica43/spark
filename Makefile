.PHONY: help setup dev test build clean lint format check install-hooks

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

setup: ## Initial setup - install dependencies and setup environment
	@echo "Setting up the project..."
	@cp -n .env.example .env 2>/dev/null || true
	@echo "Installing pre-commit hooks..."
	@pip install pre-commit
	@pre-commit install
	@echo "Installing backend dependencies..."
	@cd backend && pip install -r requirements.txt -r requirements-dev.txt
	@echo "Installing frontend dependencies..."
	@cd frontend && npm install
	@echo "Building Spark jobs..."
	@cd spark-jobs && sbt compile
	@echo "Setup complete!"

dev: ## Start all services in development mode
	@echo "Starting development environment..."
	docker-compose up --build

dev-detached: ## Start all services in detached mode
	@echo "Starting development environment in detached mode..."
	docker-compose up -d --build

stop: ## Stop all running services
	@echo "Stopping services..."
	docker-compose down

logs: ## View logs from all services
	docker-compose logs -f

test: ## Run all tests
	@echo "Running backend tests..."
	@cd backend && pytest --cov=app --cov-report=html --cov-report=term
	@echo "Running frontend tests..."
	@cd frontend && npm test -- --watch=false --code-coverage
	@echo "Running Spark job tests..."
	@cd spark-jobs && sbt test

test-backend: ## Run backend tests only
	@cd backend && pytest --cov=app --cov-report=html --cov-report=term

test-frontend: ## Run frontend tests only
	@cd frontend && npm test -- --watch=false --code-coverage

test-spark: ## Run Spark job tests only
	@cd spark-jobs && sbt test

build: ## Build all services
	@echo "Building all services..."
	docker-compose build

build-backend: ## Build backend only
	@cd backend && docker build -t spark-backend .

build-frontend: ## Build frontend only
	@cd frontend && docker build -t spark-frontend --target production .

build-spark: ## Build Spark jobs only
	@cd spark-jobs && sbt clean assembly

lint: ## Run linters on all code
	@echo "Linting backend..."
	@cd backend && flake8 app tests
	@cd backend && black --check app tests
	@cd backend && mypy app
	@echo "Linting frontend..."
	@cd frontend && npm run lint
	@echo "Linting Spark jobs..."
	@cd spark-jobs && sbt scalafmtCheck

format: ## Format all code
	@echo "Formatting backend..."
	@cd backend && black app tests
	@cd backend && isort app tests
	@echo "Formatting frontend..."
	@cd frontend && npm run format
	@echo "Formatting Spark jobs..."
	@cd spark-jobs && sbt scalafmt

check: lint test ## Run all checks (lint + test)

clean: ## Clean up generated files and containers
	@echo "Cleaning up..."
	docker-compose down -v
	@cd backend && find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	@cd backend && rm -rf .pytest_cache htmlcov .coverage
	@cd frontend && rm -rf dist node_modules .angular
	@cd spark-jobs && sbt clean

install-hooks: ## Install pre-commit hooks
	@pip install pre-commit
	@pre-commit install

migrate: ## Run database migrations
	@cd backend && flask db upgrade

migrate-create: ## Create a new migration
	@cd backend && flask db migrate -m "$(message)"

seed: ## Seed the database with initial data
	@cd backend && python scripts/seed_data.py

docs: ## Build documentation
	@cd docs && mkdocs build

docs-serve: ## Serve documentation locally
	@cd docs && mkdocs serve

shell-backend: ## Open a shell in the backend container
	docker-compose exec backend /bin/bash

shell-frontend: ## Open a shell in the frontend container
	docker-compose exec frontend /bin/sh

shell-postgres: ## Open a PostgreSQL shell
	docker-compose exec postgres psql -U sparkuser -d sparkdb
