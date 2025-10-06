from flask import Blueprint, request, jsonify
from db import get_db_connection
import random
import urllib.parse

chat_bp = Blueprint("chat", __name__)

# --- DB connection ---
db = get_db_connection()
cursor = db.cursor(dictionary=True)

def fetch_db_response(user_msg, cursor):
    """
    User message ke basis par DB se relevant results fetch kare.
    Returns: response_text (str) and common_links (list)
    """
    user_msg_lower = user_msg.lower()

    # --- Keywords ---
    tourist_keywords = ["tourist", "place", "visit", "sightseeing", "famous spot", "attraction"]
    food_keywords = ["food", "dish", "lunch", "breakfast", "dinner", "snack", "street food", "cuisine"]
    hotel_keywords = ["hotel", "stay", "resort", "guesthouse", "lodge", "inn"]

    # --- Common links ---
    query = urllib.parse.quote(user_msg + " Indore")
    common_links = [
        {"name": "🔍 Google Search", "url": f"https://www.google.com/search?q={query}"},
        {"name": "🌐 Official Indore Tourism Site", "url": "https://www.mptourism.com/destination-indore.html"},
        {"name": "🗺️ Explore on Google Maps", "url": f"https://www.google.com/maps/search/?api=1&query={query}"},
        {"name": "📘 TripInMP Guide", "url": "https://tripinmp.com/places-to-visit-in-indore/"},
        {"name": "🏛️ Indore Tourism Portal", "url": "https://indore.nic.in/tourism/"}
    ]

    # --- Tourist Places ---
    if any(kw in user_msg_lower for kw in tourist_keywords):
        try:
            cursor.execute("SELECT name FROM tourist_places LIMIT 10")
            places = cursor.fetchall()
            if places:
                response_text = "🏛️ Famous Tourist Places in Indore:\n" + "\n".join([f"- {p['name']}" for p in places])
                return response_text, common_links
        except Exception as e:
            print("DB Error (tourist places):", e)

    # --- Food ---
    if any(kw in user_msg_lower for kw in food_keywords):
        try:
            cursor.execute("SELECT name FROM foods LIMIT 10")
            foods = cursor.fetchall()
            if foods:
                response_text = "🍲 Popular Indori Dishes:\n" + "\n".join([f"- {f['name']}" for f in foods])
                return response_text, common_links
        except Exception as e:
            print("DB Error (foods):", e)

    # --- Hotels ---
    if any(kw in user_msg_lower for kw in hotel_keywords):
        try:
            cursor.execute("SELECT name FROM hotels LIMIT 10")
            hotels = cursor.fetchall()
            if hotels:
                response_text = "🏨 Recommended Hotels / Stays in Indore:\n" + "\n".join([f"- {h['name']}" for h in hotels])
                return response_text, common_links
        except Exception as e:
            print("DB Error (hotels):", e)

    # --- Agar match na ho ---
    return None, common_links


@chat_bp.route("/chatbot", methods=["POST"])
def chatbot():
    user_msg = request.json["message"].lower().strip()

    # --- Greetings & small talk ---
    greetings = ["hi", "hello", "hey", "namaste", "good morning", "good evening"]
    if any(word in user_msg for word in greetings):
        responses = [
            "Namaste! 👋 Welcome to Indore Tourism Assistant.",
            "Hello there! How’s your day going in Indore? 😊",
            "Hey traveler! Let’s explore Indore together 🏙️",
            "Hi! I’m your Indore travel buddy. Where would you like to go?"
        ]
        return jsonify({"reply": random.choice(responses), "links": []})

    # --- General replies ---
    if "how are you" in user_msg:
        return jsonify({"reply": "I'm doing great exploring Indore! 😄 What about you?", "links": []})
    if "fine" in user_msg or "good" in user_msg:
        return jsonify({"reply": "Awesome! Let’s plan something exciting around Indore 🌄", "links": []})
    if "thank you" in user_msg or "thanks" in user_msg:
        return jsonify({"reply": "You’re welcome! If you need more info about Indore, just ask! 😊","links": []})
    if "bye" in user_msg or "see you" in user_msg:
        return jsonify({"reply": "Goodbye! Have a great time in Indore! 👋","links": []})
    
    
    # ----- Common links setup ---
    query = urllib.parse.quote(user_msg + " Indore")
    common_links = [
        {"name": "🔍 Google Search", "url": f"https://www.google.com/search?q={query}"},
        {"name": "🌐 Official Indore Tourism Site", "url": "https://www.mptourism.com/destination-indore.html"},
        {"name": "🗺️ Explore on Google Maps", "url": f"https://www.google.com/maps/search/?api=1&query={query}"},
        {"name": "📘 TripInMP Guide", "url": "https://tripinmp.com/places-to-visit-in-indore/"},
        {"name": "🏛️ Indore Tourism Portal", "url": "https://indore.nic.in/tourism/"}
    ]

    # --- Special article for Indore ---
    if "indore" in user_msg:
        article = (
            "🏙️ **Indore – The Heart of Madhya Pradesh** 🏙️\n\n"
            "Indore is the largest city in Madhya Pradesh and a major commercial hub of Central India. "
            "It is known for its rich heritage, vibrant markets, and delectable street food. "
            "Famous historical landmarks include Rajwada Palace, Lal Bagh Palace, and Kanch Mandir. "
            "The city is also a gateway to nearby natural attractions like Patalpani Waterfall and Tincha Falls.\n\n"
            "🍲 **Food Culture:** Indore is renowned for its poha, jalebi, and the famous Sarafa Bazaar.\n"
            "🏨 **Accommodation:** Choose from Radisson, Sayaji, or Effotel for the perfect stay.\n"
            "🛍️ **Shopping:** Don’t miss Chappan Dukan and MG Road for street shopping and souvenirs.\n\n"
            "🌐 Learn More Below:"
        )
        return jsonify({"reply": article, "links": common_links})

    # --- Keyword Extraction (main part) ---
    # Extract potential keywords (split message into words)
    words = [w.strip(",.?") for w in user_msg.split()]
    keywords = [w for w in words if len(w) > 2]  # filter short irrelevant words

    # --- Tourist Places search (partial keyword match) ---
    try:
        for kw in keywords:
            cursor.execute("""
                SELECT * FROM tourist_places
                WHERE LOWER(name) LIKE %s OR LOWER(category) LIKE %s
            """, (f"%{kw}%", f"%{kw}%"))
            places = cursor.fetchall()
            if places:
                response_text = "Here’s what I found about this place:\n\n"
                for place in places:
                    response_text += f"🏛️ {place['name']} — {place['long_description'][:400]}...\n"
                return jsonify({"reply": response_text, "links": common_links})
    except Exception as e:
        print("DB Error (places):", e)

    # --- Hotels ---
    try:
        for kw in keywords:
            cursor.execute("""
                SELECT * FROM hotels
                WHERE LOWER(name) LIKE %s OR LOWER(location) LIKE %s
            """, (f"%{kw}%", f"%{kw}%"))
            hotels = cursor.fetchall()
            if hotels:
                response_text = "Here are some hotels you might like:\n\n"
                for h in hotels:
                    response_text += f"🏨 {h['name']} — {h['description']}\n 📍 Location: {h['location']}\n 💰 Price: {h['price']}\n ⭐ Rating: {h['rating']}\n\n\n"
                return jsonify({"reply": response_text, "links": common_links})
    except Exception as e:
        print("DB Error (hotels):", e)

    # --- Food search ---
    try:
        for kw in keywords:
            cursor.execute("""
                SELECT * FROM foods
                WHERE LOWER(name) LIKE %s OR LOWER(type) LIKE %s
            """, (f"%{kw}%", f"%{kw}%"))
            foods = cursor.fetchall()
            if foods:
                response_text = "Here are some delicious Indori dishes:\n\n"
                for f in foods:
                    response_text += f"🍴 {f['name']} — {f['description']}\n"
                return jsonify({"reply": response_text, "links": common_links})
    except Exception as e:
        print("DB Error (foods):", e)
    
    # --- DB Keyword Handling (Tourist / Food / Hotels) ---
    response_text, links = fetch_db_response(user_msg, cursor)
    if response_text:
        return jsonify({"reply": response_text, "links": links})

    # --- Fallback ---
    # fallback = (
    #     " I'm your Chatbuddy ,  you can explore more here 👇\n"
    #     "🔹 Use Google Maps or TripInMP to find related places around Indore."
    # )
    fallback = (
    "Hi! I'm your Tourist Assistant AI 🤖, here to help you explore Indore. 🏙️\n"
    "You can ask me questions related to places to visit, hotels, food, or cultural spots.\n"
    "🔹 For example, try asking about popular tourist places, local food, or recommended hotels.\n"
    "🔹 You can also use Google Maps or TripInMP to find exact locations around Indore."
    )

    return jsonify({"reply": fallback, "links": common_links})