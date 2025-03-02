
import os

MONGO_URI = "mongodb+srv://<username>:<password>@secuscan.7pmmu.mongodb.net/?retryWrites=true&w=majority&appName=secuscan"
DB_NAME = "secu_scan"

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"sol"}

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
