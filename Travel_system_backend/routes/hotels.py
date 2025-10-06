from flask import Blueprint, jsonify
from db import get_db_connection

hotels_bp = Blueprint("hotels", __name__, url_prefix="/hotels")

@hotels_bp.route("/", methods=["GET"])
def get_hotels():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM hotels")
    hotels = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(hotels)

@hotels_bp.route("/<int:hotel_id>", methods=["GET"])
def get_hotel(hotel_id):
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM hotels WHERE id = %s", (hotel_id,))
    hotel = cursor.fetchone()
    cursor.close()
    conn.close()
    if hotel:
        return jsonify(hotel)
    return jsonify({"error": "Hotel not found"}), 404
