"""Test health check endpoints."""


def test_health_check(client):
    """Test health check endpoint."""
    response = client.get("/api/health/")
    assert response.status_code == 200
    data = response.get_json()
    assert data["status"] == "healthy"
    assert data["service"] == "spark-backend"
