from flask import Flask, request, jsonify, send_from_directory
import json
import os
from flask_cors import CORS

app = Flask(__name__, static_folder=".", static_url_path="")
CORS(app)  # Enable CORS for all routes

# Define data directory relative to this file
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(SCRIPT_DIR, "data")
DATA_FILE = os.path.join(DATA_DIR, "data.json")
BANNER_FILE = os.path.join(DATA_DIR, "banner.json")
CONFIG_FILE = os.path.join(DATA_DIR, "config.json")

# Create data directory if it doesn't exist
if not os.path.exists(DATA_DIR):
    os.makedirs(DATA_DIR)

# Initialize JSON file if it doesn't exist
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w") as f:
        json.dump({"items": []}, f)

# Initialize banner JSON file if it doesn't exist
if not os.path.exists(BANNER_FILE):
    with open(BANNER_FILE, "w") as f:
        json.dump({"bannerUrl": "https://cdn.midjourney.com/11cffed4-8a58-41de-98ff-d0cbd01cc75a/0_2.png"}, f)

# Initialize config JSON file if it doesn't exist
if not os.path.exists(CONFIG_FILE):
    with open(CONFIG_FILE, "w") as f:
        json.dump({"pageTitle": "start:ichi", "favicon": "%PUBLIC_URL%/favicon.ico"}, f)

# Helper function to read from JSON file
def read_data():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

# Helper function to write to JSON file
def write_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=2)

# Helper function to read banner data
def read_banner():
    with open(BANNER_FILE, "r") as f:
        return json.load(f)

# Helper function to write banner data
def write_banner(data):
    with open(BANNER_FILE, "w") as f:
        json.dump(data, f, indent=2)

# Helper function to read config data
def read_config():
    with open(CONFIG_FILE, "r") as f:
        return json.load(f)

# Helper function to write config data
def write_config(data):
    with open(CONFIG_FILE, "w") as f:
        json.dump(data, f, indent=2)

# API Routes
@app.route("/api/items", methods=["GET"])
def get_items():
    data = read_data()
    return jsonify(data["items"])

@app.route("/api/banner", methods=["GET"])
def get_banner():
    banner_data = read_banner()
    return jsonify(banner_data)

@app.route("/api/banner", methods=["POST"])
def update_banner():
    new_banner_data = request.json
    write_banner(new_banner_data)
    return jsonify(new_banner_data), 200

@app.route("/api/config", methods=["GET"])
def get_config():
    config_data = read_config()
    return jsonify(config_data)

@app.route("/api/config", methods=["POST"])
def update_config():
    new_config_data = request.json
    write_config(new_config_data)
    return jsonify(new_config_data), 200

@app.route("/api/items", methods=["POST"])
def add_item():
    data = read_data()
    new_item = request.json
    
    # Generate a new ID (simple approach)
    if data["items"]:
        new_id = max(item["id"] for item in data["items"]) + 1
    else:
        new_id = 1
        
    new_item["id"] = new_id
    data["items"].append(new_item)
    write_data(data)
    return jsonify(new_item), 201

@app.route("/api/items/<int:item_id>", methods=["PUT"])
def update_item(item_id):
    data = read_data()
    for i, item in enumerate(data["items"]):
        if item["id"] == item_id:
            # Update item with request data
            updated_item = request.json
            updated_item["id"] = item_id  # Ensure ID doesn't change
            data["items"][i] = updated_item
            write_data(data)
            return jsonify(updated_item)
    return jsonify({"error": "Item not found"}), 404

@app.route("/api/items/<int:item_id>", methods=["DELETE"])
def delete_item(item_id):
    data = read_data()
    for i, item in enumerate(data["items"]):
        if item["id"] == item_id:
            del data["items"][i]
            write_data(data)
            return jsonify({"message": "Item deleted"})
    return jsonify({"error": "Item not found"}), 404

# Serve React app
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    print(f"Serving path: {path}")
    print(f"Static folder: {app.static_folder}")
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True) 
