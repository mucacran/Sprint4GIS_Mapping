from pathlib import Path
import os

from dotenv import load_dotenv
from flask import Flask, jsonify, send_from_directory


BASE_DIR = Path(__file__).resolve().parent

# Load environment variables from .env at project root.
load_dotenv(BASE_DIR / ".env")

app = Flask(__name__, static_folder=str(BASE_DIR), static_url_path="")


@app.get("/")
def index():
    return send_from_directory(BASE_DIR, "index.html")


@app.get("/config")
def config():
    # Return only the minimum value needed by the frontend.
    return jsonify({"apiKey": os.getenv("API_KEY", "")})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
