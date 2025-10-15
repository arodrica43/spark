"""Test models."""
from app.models import Item


def test_item_creation():
    """Test creating an Item model."""
    item = Item(name="Test Item", description="Test Description")
    assert item.name == "Test Item"
    assert item.description == "Test Description"


def test_item_to_dict():
    """Test Item model to_dict method."""
    item = Item(id=1, name="Test Item", description="Test Description")
    item_dict = item.to_dict()
    assert item_dict["id"] == 1
    assert item_dict["name"] == "Test Item"
    assert item_dict["description"] == "Test Description"
    assert "created_at" in item_dict
    assert "updated_at" in item_dict


def test_item_repr():
    """Test Item model representation."""
    item = Item(name="Test Item")
    assert repr(item) == "<Item Test Item>"
