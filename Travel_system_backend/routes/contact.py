from flask import Blueprint, request, jsonify
from db import get_db_connection

contact_bp = Blueprint("contact", __name__)

# --- DB connection ---
db = get_db_connection()
cursor = db.cursor()

# --- Create table automatically ---
cursor.execute("""
CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")
db.commit()

# --- Contact route ---
@contact_bp.route("/contact", methods=["POST"])
def contact():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    subject = data.get("subject", "")
    message = data.get("message")

    if not name or not email or not message:
        return jsonify({"error": "Name, email, and message are required"}), 400

    sql = "INSERT INTO contact_messages (name, email, subject, message) VALUES (%s, %s, %s, %s)"
    cursor.execute(sql, (name, email, subject, message))
    db.commit()

    return jsonify({"success": "Message sent successfully"}), 200
