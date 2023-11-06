import datetime
from flask import Flask
from flask_jwt_extended import JWTManager
from hugchat import hugchat
from hugchat.login import Login
from pymed import PubMed
from dotenv import load_dotenv
import os
from flask_cors import CORS
import logging
from pymongo import MongoClient

logging.basicConfig(level=logging.DEBUG)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["pubmedai"]
users_collection = db["users"]
cookies_collection = db["hgchat_cookies"]

load_dotenv()

hugging_chat_email = os.environ.get('hugging_chat_email')
hugging_chat_passwd = os.environ.get('hugging_chat_passwd')

try:
    # Load cookies from db, if already authenticated once
    sign = Login(hugging_chat_email, None)
    cookies = cookies_collection.find_one(
        {"email": hugging_chat_email}).get('cookie')
except:
    # Log in to huggingface and grant authorization to huggingchat
    sign = Login(hugging_chat_email, hugging_chat_passwd)
    cookies = sign.login().get_dict()

    cookies_collection.insert_one({
        "email": hugging_chat_email,
        "cookie": cookies.get_dict()
    })

chatbot = hugchat.ChatBot(cookies=cookies)

app = Flask(__name__)
CORS(app)

jwt = JWTManager(app)  # initialize JWTManager
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(days=1)
