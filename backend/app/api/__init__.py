"""API routes and blueprints."""
from flask import jsonify
from flask_smorest import Blueprint, abort
from marshmallow import Schema, fields

from app.extensions import db, redis_client
from app.models import Item

# Health check blueprint
health_bp = Blueprint(
    "health",
    "health",
    url_prefix="/api/health",
    description="Health check endpoints"
)


@health_bp.route("/", methods=["GET"])
def health_check():
    """
    Health check endpoint.
    ---
    responses:
      200:
        description: Service is healthy
    """
    return jsonify({"status": "healthy", "service": "spark-backend"}), 200


# Item schemas
class ItemSchema(Schema):
    """Item schema for serialization."""
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    description = fields.Str()
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)


class ItemQueryArgsSchema(Schema):
    """Schema for item query parameters."""
    limit = fields.Int(missing=10)
    offset = fields.Int(missing=0)


# Items blueprint
items_bp = Blueprint(
    "items",
    "items",
    url_prefix="/api/items",
    description="Items management endpoints"
)


@items_bp.route("/", methods=["GET"])
@items_bp.arguments(ItemQueryArgsSchema, location="query")
@items_bp.response(200, ItemSchema(many=True))
def get_items(args):
    """
    Get all items.
    ---
    parameters:
      - name: limit
        in: query
        type: integer
        default: 10
      - name: offset
        in: query
        type: integer
        default: 0
    responses:
      200:
        description: List of items
    """
    limit = args.get("limit", 10)
    offset = args.get("offset", 0)
    
    items = Item.query.limit(limit).offset(offset).all()
    return [item.to_dict() for item in items]


@items_bp.route("/<int:item_id>", methods=["GET"])
@items_bp.response(200, ItemSchema)
def get_item(item_id):
    """
    Get item by ID.
    ---
    parameters:
      - name: item_id
        in: path
        type: integer
        required: true
    responses:
      200:
        description: Item details
      404:
        description: Item not found
    """
    item = Item.query.get(item_id)
    if not item:
        abort(404, message="Item not found")
    return item.to_dict()


@items_bp.route("/", methods=["POST"])
@items_bp.arguments(ItemSchema)
@items_bp.response(201, ItemSchema)
def create_item(item_data):
    """
    Create a new item.
    ---
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              name:
                type: string
              description:
                type: string
    responses:
      201:
        description: Item created successfully
    """
    item = Item(**item_data)
    db.session.add(item)
    db.session.commit()
    
    # Invalidate cache
    redis_client.set(f"item:{item.id}", str(item.to_dict()), ex=300)
    
    return item.to_dict(), 201


@items_bp.route("/<int:item_id>", methods=["PUT"])
@items_bp.arguments(ItemSchema)
@items_bp.response(200, ItemSchema)
def update_item(item_data, item_id):
    """
    Update an item.
    ---
    parameters:
      - name: item_id
        in: path
        type: integer
        required: true
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              name:
                type: string
              description:
                type: string
    responses:
      200:
        description: Item updated successfully
      404:
        description: Item not found
    """
    item = Item.query.get(item_id)
    if not item:
        abort(404, message="Item not found")
    
    for key, value in item_data.items():
        setattr(item, key, value)
    
    db.session.commit()
    
    # Invalidate cache
    redis_client.set(f"item:{item.id}", str(item.to_dict()), ex=300)
    
    return item.to_dict()


@items_bp.route("/<int:item_id>", methods=["DELETE"])
@items_bp.response(204)
def delete_item(item_id):
    """
    Delete an item.
    ---
    parameters:
      - name: item_id
        in: path
        type: integer
        required: true
    responses:
      204:
        description: Item deleted successfully
      404:
        description: Item not found
    """
    item = Item.query.get(item_id)
    if not item:
        abort(404, message="Item not found")
    
    db.session.delete(item)
    db.session.commit()
    
    return "", 204
