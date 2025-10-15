FROM redis:7-alpine

# Configure Redis for persistence
CMD ["redis-server", "--appendonly", "yes", "--appendfsync", "everysec"]

# Add healthcheck
HEALTHCHECK --interval=10s --timeout=5s --retries=5 \
  CMD redis-cli ping || exit 1
