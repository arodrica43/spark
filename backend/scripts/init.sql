-- Initialize database
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create items table if not exists
CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on created_at
CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at);
