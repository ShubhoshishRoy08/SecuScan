from app.database import vulnerabilities_collection

test_data = {"test": "MongoDB Atlas is working!"}
vulnerabilities_collection.insert_one(test_data)

print("Data inserted successfully!")
