from pymongo import MongoClient
from app.config import MONGO_URI, DB_NAME

# Connect to MongoDB
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# Collection to store vulnerabilities
vulnerabilities_collection = db["vulnerabilities"]
