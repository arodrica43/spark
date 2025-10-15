FROM postgres:15-alpine

# Copy initialization scripts
COPY ../backend/scripts/init.sql /docker-entrypoint-initdb.d/

# Add healthcheck
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
  CMD pg_isready -U ${POSTGRES_USER:-postgres}
