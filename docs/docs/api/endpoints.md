# API Endpoints

## Base URL

- Development: `http://localhost:5000/api`
- Production: `/api`

## Health Check

### GET /health/

Check API health status.

**Response:**
```json
{
  "status": "healthy",
  "service": "spark-backend"
}
```

## Items

### GET /items/

Get all items with pagination.

**Query Parameters:**
- `limit` (integer, default: 10): Number of items to return
- `offset` (integer, default: 0): Offset for pagination

**Response:**
```json
[
  {
    "id": 1,
    "name": "Item 1",
    "description": "Description 1",
    "created_at": "2024-01-01T00:00:00",
    "updated_at": "2024-01-01T00:00:00"
  }
]
```

### GET /items/{id}

Get item by ID.

**Response:**
```json
{
  "id": 1,
  "name": "Item 1",
  "description": "Description 1",
  "created_at": "2024-01-01T00:00:00",
  "updated_at": "2024-01-01T00:00:00"
}
```

### POST /items/

Create a new item.

**Request Body:**
```json
{
  "name": "New Item",
  "description": "New Description"
}
```

**Response:** Returns created item with ID.

### PUT /items/{id}

Update an item.

**Request Body:**
```json
{
  "name": "Updated Name",
  "description": "Updated Description"
}
```

**Response:** Returns updated item.

### DELETE /items/{id}

Delete an item.

**Response:** 204 No Content

## Interactive Documentation

Visit `/swagger-ui` for interactive API documentation.
