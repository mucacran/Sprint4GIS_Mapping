from pathlib import Path
import os

from dotenv import load_dotenv
from flask import Flask, jsonify, send_from_directory


BASE_DIR = Path(__file__).resolve().parent
DIST_DIR = BASE_DIR / "dist"
FRONTEND_DIR = DIST_DIR if (DIST_DIR / "index.html").exists() else BASE_DIR

# Load environment variables from .env at project root.
load_dotenv(BASE_DIR / ".env")

app = Flask(__name__, static_folder=str(BASE_DIR), static_url_path="")


@app.get("/")
def index():
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.get("/<path:resource>")
def frontend_resource(resource):
    # Allow serving generated files from dist/ when build exists.
    target = FRONTEND_DIR / resource
    if target.exists() and target.is_file():
        return send_from_directory(FRONTEND_DIR, resource)

    # If not found in dist/, fallback to source files for local development.
    fallback = BASE_DIR / resource
    if fallback.exists() and fallback.is_file():
        return send_from_directory(BASE_DIR, resource)

    return ("Not Found", 404)


@app.get("/config")
def config():
    # Return only the minimum value needed by the frontend.
    return jsonify({"apiKey": os.getenv("API_KEY", "")})


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
