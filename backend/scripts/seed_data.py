"""Seed database with initial data."""
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.main import create_app
from app.extensions import db
from app.models import Item


def seed_data():
    """Seed the database with initial data."""
    app = create_app()
    
    with app.app_context():
        # Clear existing data
        Item.query.delete()
        
        # Create sample items
        items = [
            Item(name="Sample Item 1", description="This is the first sample item"),
            Item(name="Sample Item 2", description="This is the second sample item"),
            Item(name="Sample Item 3", description="This is the third sample item"),
            Item(name="Sample Item 4", description="This is the fourth sample item"),
            Item(name="Sample Item 5", description="This is the fifth sample item"),
        ]
        
        db.session.add_all(items)
        db.session.commit()
        
        print(f"Successfully seeded {len(items)} items")


if __name__ == "__main__":
    seed_data()
