# routes/food.py
from flask import Blueprint, jsonify
from db import get_db_connection

food_bp = Blueprint("food", __name__)

@food_bp.route("/food", methods=["GET"])
def get_food():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM foods")
    foods = cursor.fetchall()

   
    for food in foods:
        cursor.execute(
            "SELECT spot_name, map_link FROM food_spots WHERE food_id = %s", (food['id'],)
        )
        spots = cursor.fetchall()
        food['spots'] = spots  

    cursor.close()
    connection.close()

    return jsonify(foods)
