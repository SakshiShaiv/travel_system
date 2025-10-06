from flask import Flask
from db import get_db_connection
from routes.places import places_bp
from routes.hotels import hotels_bp
from routes.food import food_bp
from routes.chat import chat_bp
from routes.contact import contact_bp
from flask_cors import CORS
app = Flask(__name__)
CORS(app)




conn = get_db_connection()
if conn:
    conn.close()

@app.route("/")
def home():
    return "Tourism API is running!"


app.register_blueprint(places_bp)
app.register_blueprint(hotels_bp)
app.register_blueprint(food_bp)
app.register_blueprint(chat_bp)
app.register_blueprint(contact_bp)

if __name__ == "__main__":
    app.run(debug=True)
