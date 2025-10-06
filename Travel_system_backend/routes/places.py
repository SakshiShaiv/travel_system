from flask import Blueprint, jsonify
from db import get_db_connection


places_bp = Blueprint("places", __name__)

@places_bp.route("/places", methods=["GET"])

def get_places():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM tourist_places")
    places = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(places)
