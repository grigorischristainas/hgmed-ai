from flask import request, jsonify
from config import app, users_collection, ALLOWED_FOR_REGISTRATION, cookies
from models import AbstractSummaryPostSchema, UserRegistrationSchema, PubMedResultsArgsSchema, EmailTokenVerifyArgsSchema
from cerberus import Validator
import time
from random import randint
import hashlib
from flask_jwt_extended import create_access_token, jwt_required
from helpers import getPubMedPapers, send_verification_email, confirm_verification_token, isResultQueryInvalid
from hugchat import hugchat


@app.route("/email/verify")
def verify_email():
    try:
        json_args = request.args.to_dict()

        request_validator = Validator(EmailTokenVerifyArgsSchema)
        if (not request_validator.validate(json_args)):
            validation_errors = []

            for field, errors in request_validator.errors.items():
                validation_errors.append({field: errors})

            return jsonify({
                "status": "ERR",
                "message": "Invalid request arguments",
                "validation": validation_errors
            }), 422

        token = json_args.get('token')
        email = confirm_verification_token(token)

        if (not email):
            return jsonify({
                "status": "ERR",
                "message": "Not found",
            }), 404

        filter = {'email': email}
        newvalues = {"$set": {'verified': True}}
        users_collection.update_one(filter, newvalues)

        return jsonify({
            "status": "OK",
            "message": "Email is verified",
        }), 200

    except Exception as e:
        return jsonify({
            "status": "ERR",
            "message": str(e)
        }), 500


@app.route("/users", methods=["POST"])
def register():
    try:
        json_request = request.json

        request_validator = Validator(UserRegistrationSchema)
        if (not request_validator.validate(json_request)):
            validation_errors = []

            for field, errors in request_validator.errors.items():
                validation_errors.append({field: errors})

            return jsonify({
                "status": "ERR",
                "message": "Invalid request body",
                "validation": validation_errors
            }), 422

        if (not (json_request["email"] in ALLOWED_FOR_REGISTRATION)):
            return jsonify({
                "status": "ERR",
                "message": "Invalid request body",
            }), 422

        json_request["password"] = hashlib.sha256(
            json_request["password"].encode("utf-8")).hexdigest()
        doc = users_collection.find_one(
            {"email": json_request["email"]})

        json_request['verified'] = False

        if not doc:
            users_collection.insert_one(json_request)
            send_verification_email(json_request["email"])
            return jsonify({
                "status": "OK",
                "message": "User created successfully"
            }), 201
        else:
            return jsonify({
                "status": "ERR",
                "message": "Invalid request body",
                "validation": [
                    {
                        "email": "email already exists"
                    }
                ]
            }), 422

    except Exception as e:
        return jsonify({
            "status": "ERR",
            "message": str(e)
        }), 500


@app.route("/login", methods=["POST"])
def login():

    json_request = request.json

    request_validator = Validator(UserRegistrationSchema)
    if (not request_validator.validate(json_request)):
        validation_errors = []

        for field, errors in request_validator.errors.items():
            validation_errors.append({field: errors})

        return jsonify({
            "status": "ERR",
            "message": "Invalid request body",
            "validation": validation_errors
        }), 422

    user_from_db = users_collection.find_one(
        {'email': json_request['email']})

    if user_from_db and user_from_db.get('verified'):
        encrpted_password = hashlib.sha256(
            json_request['password'].encode("utf-8")).hexdigest()
        if encrpted_password == user_from_db['password']:
            access_token = create_access_token(
                identity=user_from_db['email'])
            return jsonify({
                "status": "OK",
                "message": "Request was successful",
                'accessToken': access_token
            }), 200

    return jsonify({
        "status": "ERR",
        "message": "The email or password is incorrect",
    }), 401


@app.route('/studies/rct', methods=['GET'])
@jwt_required()
def retrieve_papers():
    try:
        json_args = request.args.to_dict()

        request_validator = Validator(PubMedResultsArgsSchema)
        if (not request_validator.validate(json_args)):
            validation_errors = []

            for field, errors in request_validator.errors.items():
                validation_errors.append({field: errors})

            return jsonify({
                "status": "ERR",
                "message": "Invalid request arguments",
                "validation": validation_errors
            }), 422

        keyword = json_args.get('keyword')
        max_results = json_args.get('maxResults', 2)
        page = json_args.get('page')

        if not max_results.isnumeric() or not page.isnumeric():
            return jsonify({
                "status": "ERR",
                "message": "Invalid request arguments",
                "validation": [{
                    "max_results": "must be in numeric format",
                    "page": "must be in numeric format"
                }]
            }), 422

        items, total_count = getPubMedPapers(keyword, page, max_results)

        return jsonify({
            "status": "OK",
            "message": "Request was successful",
            "_items": items,
            "_meta": {
                "page": int(page),
                "max": int(max_results),
                "total": int(total_count) // int(max_results)
            }
        })

    except Exception as e:
        return jsonify({
            "status": "ERR",
            "message": str(e)
        }), 500


@app.route('/ai/huggingchat/generate', methods=['POST'])
@jwt_required()
def get_huggingchat_summary():
    try:
        json_request = request.json
        time.sleep(randint(0, 4))

        request_validator = Validator(AbstractSummaryPostSchema)

        if (not request_validator.validate(json_request)):
            validation_errors = []

            for field, errors in request_validator.errors.items():
                validation_errors.append({field: errors})

            return jsonify({
                "status": "ERR",
                "message": "Invalid request body",
                "validation": validation_errors
            }), 422

        prompt = request.json['prompt']

        baseQuery = 'Please identify for the following research the intervention ' \
            '(or comparison of interventions), the disease and the effectiveness of the intervention. ' \
            'Respond only in the following format with no extra text: ' \
            '# <intervention (or comparison of interventions)> / <disease> / <effectiveness of the intervention>: '

        chatbot = hugchat.ChatBot(cookies=cookies)
        query_result = chatbot.query(baseQuery + prompt)

        # Handle invalid responses by refetching result
        max_retries = 5
        if isResultQueryInvalid(query_result):
            for i in range(0, max_retries):
                time.sleep(1)
                query_result = chatbot.query(baseQuery + prompt)
                if not isResultQueryInvalid(query_result):
                    break

        # Return an error if result is still invalid
        if isResultQueryInvalid(query_result):
            return jsonify({
                "status": "ERR",
                "message": str(e)
            }), 500

        split_query = str(query_result).split("#")[1].split(' / ')
        intervention = split_query[0].strip()
        disease = split_query[1].strip()
        effectiveness = split_query[2].strip()

        # Use jsonify to format JSON response
        return jsonify({
            "status": "OK",
            "message": "Request was successful",
            "_items": [
                {
                    "intervention": intervention,
                    "disease": disease,
                    "effectiveness": effectiveness
                }
            ],
        })
    except Exception as e:
        return jsonify({
            "status": "ERR",
            "message": str(e)
        }), 500
