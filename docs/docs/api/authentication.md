# Authentication

## Current Status

The current version does not implement authentication. All API endpoints are publicly accessible.

## Future Implementation

Authentication will be implemented using JWT (JSON Web Tokens).

### Planned Features

- User registration
- User login
- JWT token generation
- Token validation middleware
- Refresh tokens
- Role-based access control (RBAC)

### JWT Flow

1. User submits credentials to `/api/auth/login`
2. Backend validates credentials
3. Backend generates JWT token
4. Frontend stores token (localStorage/sessionStorage)
5. Frontend includes token in Authorization header
6. Backend validates token for protected endpoints

### Example

```typescript
// Frontend
const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
};

// Backend
@jwt_required()
def protected_route():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user)
```

### Protected Endpoints

Future protected endpoints:
- `POST /api/items/` - Create (authenticated users only)
- `PUT /api/items/{id}` - Update (owner or admin)
- `DELETE /api/items/{id}` - Delete (owner or admin)

### Public Endpoints

Will remain public:
- `GET /api/health/` - Health check
- `GET /api/items/` - List items (read-only)
- `GET /api/items/{id}` - Get item (read-only)

## Security Considerations

- Use HTTPS in production
- Secure token storage
- Token expiration (15-30 minutes)
- Refresh token rotation
- Rate limiting
- CORS configuration
