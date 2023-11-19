import datetime
from flask import Flask
from flask_jwt_extended import JWTManager
from hugchat.login import Login
from dotenv import load_dotenv
import os
from flask_cors import CORS
import logging
from pymongo import MongoClient
from flask_mail import Mail

logging.basicConfig(level=logging.DEBUG)

load_dotenv()

MONGO_DB_USERNAME = os.environ.get('MONGO_DB_USERNAME')
MONGO_DB_PASSWORD = os.environ.get('MONGO_DB_PASSWORD')
MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
ALLOWED_FOR_REGISTRATION = os.environ.get('ALLOWED_FOR_REGISTRATION')

# MongoDB connection
client = MongoClient(
    f"mongodb+srv://{MONGO_DB_USERNAME}:{MONGO_DB_PASSWORD}@thesisproject.4alrnup.mongodb.net/?retryWrites=true&w=majority")
db = client["pubmedai"]
users_collection = db["users"]
cookies_collection = db["hgchat_cookies"]

hugging_chat_email = os.environ.get('hugging_chat_email')
hugging_chat_passwd = os.environ.get('hugging_chat_passwd')

# Load cookies from db, if already authenticated once
sign = Login(hugging_chat_email, None)
cookies_db = cookies_collection.find_one(
    {"email": hugging_chat_email})
if cookies_db:
    cookies = cookies_db.get('cookie')
else:
    sign = Login(hugging_chat_email, hugging_chat_passwd)
    cookies = sign.login().get_dict()

    cookies_collection.insert_one({
        "email": hugging_chat_email,
        "cookie": cookies
    })

app = Flask(__name__)
CORS(app)

jwt = JWTManager(app)  # initialize JWTManager
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(0)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = MAIL_USERNAME
app.config['MAIL_PASSWORD'] = MAIL_PASSWORD
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail = Mail(app)
