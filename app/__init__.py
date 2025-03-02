from flask import Flask
from app.routes import routes
from flask_cors import CORS  # ✅ Import CORS

app = Flask(__name__)
app.config.from_object("app.config")

CORS(app) #added later

# Register Blueprint
#app.register_blueprint(routes)
app.register_blueprint(routes, url_prefix="/")
