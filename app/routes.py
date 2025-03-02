import os
import subprocess
from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin  # ✅ Import CORS
from werkzeug.utils import secure_filename
from app.database import vulnerabilities_collection
from app.slither_analysis import run_slither_analysis  # ✅ Import this function

routes = Blueprint("routes", __name__)
CORS(routes)  # ✅ Enable CORS for the entire blueprint

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"sol"}

# Ensure the uploads folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    """Check if the uploaded file has a .sol extension"""
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# for uploading the vulnerabilities into mongoDB
@routes.route("/upload", methods=["POST"])
@cross_origin()  # ✅ Enable CORS for this route
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)  # Save file to uploads folder

        # ✅ Run Slither analysis
        vulnerabilities = run_slither_analysis(file_path)

        # ✅ Save vulnerabilities to MongoDB
        if vulnerabilities:
            vulnerabilities_collection.insert_one({"filename": filename, "vulnerabilities": vulnerabilities})

        return jsonify({"message": "File uploaded successfully", "vulnerabilities": vulnerabilities}), 200
    
    return jsonify({"error": "Invalid file type. Only .sol files are allowed."}), 400

# code for retrieving the vulnerabilities
@routes.route("/vulnerabilities", methods=["GET"])
@cross_origin()  # ✅ Enable CORS for this route
def get_vulnerabilities():
    """Fetch all vulnerabilities from MongoDB"""
    vulnerabilities = list(vulnerabilities_collection.find({}, {"_id": 0}))  # Exclude _id field
    return jsonify({"vulnerabilities": vulnerabilities}), 200
