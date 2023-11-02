from flask import Flask
from hugchat import hugchat
from hugchat.login import Login
from pymed import PubMed
from dotenv import load_dotenv
import os
from flask_cors import CORS

cookie_path_dir = "./cookies_snapshot"

load_dotenv()

hugging_chat_email = os.environ.get('hugging_chat_email')
hugging_chat_passwd = os.environ.get('hugging_chat_passwd')

try:
    # Load cookies from dir, if already authenticated once
    sign = Login(hugging_chat_email, None)
    cookies = sign.loadCookiesFromDir(cookie_path_dir)
except:
    # Log in to huggingface and grant authorization to huggingchat
    sign = Login(hugging_chat_email, hugging_chat_passwd)
    cookies = sign.login()

    # Save cookies to the local directory
    cookie_path_dir = "./cookies_snapshot"
    sign.saveCookiesToDir(cookie_path_dir)

chatbot = hugchat.ChatBot(cookies=cookies.get_dict())
pubmed = PubMed(tool="MyTool", email=hugging_chat_email)

app = Flask(__name__)
CORS(app)
