from flask import Flask, render_template
# from flask_sqlalchemy import SQLAlchemy
from config import Config, db
from routes import register_routes
import requests

app = Flask(__name__)
latest_data = {}



def subscribe_to_webhook(machine_id, callback_url):
    webhook_url = "https://manufcaturing-challenge-production.up.railway.app/Webhook"
    payload = {
        "machine": machine_id,
        "callback_url": callback_url
    }
    
    response = requests.post(webhook_url, json=payload)
    print("Webhook subscription response code:", response.status_code)
    print("Webhook subscription response text:", response.text)  # Print raw response text
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error subscribing to webhook: {response.status_code}")
        return None 

app.config.from_object(Config)
db.init_app(app)

def create_tables():
    with app.app_context():
        try:
            db.create_all()  # Create tables for the default bind
            db.create_all(bind=['welding_db', 'stamping_db', 'painting_db', 'agv_db', 'cnc_milling_db', 'leak_test_db'])
            print("Tables created successfully.")
        except Exception as e:
            print(f"Error creating tables: {e}")

# Register routes from routes.py
register_routes(app)

if __name__ == '__main__':
    app.config.from_object(Config)

    create_tables()  
    
    callback_url = "https://91e8-105-235-133-202.ngrok-free.app/sensor-data"  
    machine_ids = [
        "welding_robot_006", "agv_003", "cnc_milling_004",
        "leak_test_005", "painting_robot_002", "stamping_press_001"
    ]
    for machine_id in machine_ids:
        subscribe_to_webhook(machine_id, callback_url)

    app.run()
