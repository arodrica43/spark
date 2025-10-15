"""Test items API endpoints."""
import json
from app.models import Item
from app.extensions import db


def test_get_items_empty(client):
    """Test getting items when none exist."""
    response = client.get("/api/items/")
    assert response.status_code == 200
    data = response.get_json()
    assert data == []


def test_create_item(client, app):
    """Test creating a new item."""
    item_data = {"name": "Test Item", "description": "Test Description"}
    response = client.post(
        "/api/items/",
        data=json.dumps(item_data),
        content_type="application/json",
    )
    assert response.status_code == 201
    data = response.get_json()
    assert data["name"] == "Test Item"
    assert data["description"] == "Test Description"
    assert "id" in data
    assert "created_at" in data


def test_get_items(client, app):
    """Test getting all items."""
    # Create test items
    with app.app_context():
        item1 = Item(name="Item 1", description="Description 1")
        item2 = Item(name="Item 2", description="Description 2")
        db.session.add_all([item1, item2])
        db.session.commit()

    response = client.get("/api/items/")
    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 2


def test_get_item_by_id(client, app):
    """Test getting item by ID."""
    with app.app_context():
        item = Item(name="Test Item", description="Test Description")
        db.session.add(item)
        db.session.commit()
        item_id = item.id

    response = client.get(f"/api/items/{item_id}")
    assert response.status_code == 200
    data = response.get_json()
    assert data["name"] == "Test Item"
    assert data["id"] == item_id


def test_get_item_not_found(client):
    """Test getting non-existent item."""
    response = client.get("/api/items/9999")
    assert response.status_code == 404


def test_update_item(client, app):
    """Test updating an item."""
    with app.app_context():
        item = Item(name="Original Name", description="Original Description")
        db.session.add(item)
        db.session.commit()
        item_id = item.id

    update_data = {"name": "Updated Name", "description": "Updated Description"}
    response = client.put(
        f"/api/items/{item_id}",
        data=json.dumps(update_data),
        content_type="application/json",
    )
    assert response.status_code == 200
    data = response.get_json()
    assert data["name"] == "Updated Name"
    assert data["description"] == "Updated Description"


def test_update_item_not_found(client):
    """Test updating non-existent item."""
    update_data = {"name": "Updated Name"}
    response = client.put(
        "/api/items/9999",
        data=json.dumps(update_data),
        content_type="application/json",
    )
    assert response.status_code == 404


def test_delete_item(client, app):
    """Test deleting an item."""
    with app.app_context():
        item = Item(name="To Delete", description="Will be deleted")
        db.session.add(item)
        db.session.commit()
        item_id = item.id

    response = client.delete(f"/api/items/{item_id}")
    assert response.status_code == 204

    # Verify item is deleted
    response = client.get(f"/api/items/{item_id}")
    assert response.status_code == 404


def test_delete_item_not_found(client):
    """Test deleting non-existent item."""
    response = client.delete("/api/items/9999")
    assert response.status_code == 404


def test_items_pagination(client, app):
    """Test items pagination."""
    with app.app_context():
        for i in range(25):
            item = Item(name=f"Item {i}", description=f"Description {i}")
            db.session.add(item)
        db.session.commit()

    # Test default pagination
    response = client.get("/api/items/")
    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 10  # Default limit

    # Test custom pagination
    response = client.get("/api/items/?limit=5&offset=5")
    assert response.status_code == 200
    data = response.get_json()
    assert len(data) == 5
