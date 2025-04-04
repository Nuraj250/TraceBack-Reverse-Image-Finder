from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from utils.image_search import compute_hash, search_image

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'static/uploads'
DATABASE_FOLDER = 'static/database'  # This is the folder where you store images for comparison
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(DATABASE_FOLDER, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    image = request.files['image']
    filename = secure_filename(image.filename)
    image_path = os.path.join(UPLOAD_FOLDER, filename)
    image.save(image_path)

    # Compute perceptual hash for basic check
    image_hash = compute_hash(image_path)

    # Perform real image search (feature matching using ORB)
    results = search_image(image_path, DATABASE_FOLDER)

    return jsonify({
        "hash": image_hash,
        "results": results# Include AI analysis results
    })


if __name__ == "__main__":
    app.run(debug=True)
