from flask import request, jsonify
from config import app, chatbot, pubmed, users_collection
from models import AbstractSummaryPostSchema, PubMedResultsPostSchema, UserRegistrationSchema
from cerberus import Validator
import time
from random import randint
import hashlib
from flask_jwt_extended import create_access_token, jwt_required


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

        json_request["password"] = hashlib.sha256(
            json_request["password"].encode("utf-8")).hexdigest()
        doc = users_collection.find_one(
            {"email": json_request["email"]})

        if not doc:
            users_collection.insert_one(json_request)
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

    if user_from_db:
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


@app.route('/studies/rct', methods=['POST'])
@jwt_required()
def get_papers():
    try:
        json_request = request.json

        request_validator = Validator(PubMedResultsPostSchema)
        if (not request_validator.validate(json_request)):
            validation_errors = []

            for field, errors in request_validator.errors.items():
                validation_errors.append({field: errors})

            return jsonify({
                "status": "ERR",
                "message": "Invalid request body",
                "validation": validation_errors
            }), 422

        keyword = json_request.get('keyword')
        config = request.json.get('config', {})
        max_results = config.get('maxResults', 10)

        pubMedQuery = '("' + keyword + \
            '"[All Fields]) AND (randomizedcontrolledtrial[Filter])'

        results = pubmed.query(pubMedQuery, max_results=max_results)

        json_results = []

        for article in results:
            # Extract and format information from the article
            title = article.title
            abstract = article.abstract
            publication_date = article.publication_date
            authors = article.authors
            pubmed_id = article.pubmed_id

            author_names_only = []
            if (title and abstract and publication_date and authors):
                for author in authors:
                    author_first_name = author['firstname']
                    author_last_name = author['lastname']
                    author_name = author_first_name + ' ' + author_last_name
                    author_names_only.append(author_name)

                response_data = {
                    "title": title.replace('\n', ''),
                    "abstract": abstract.replace('\n', ''),
                    "publicationDate": publication_date.strftime('%d/%m/%Y'),
                    "authors": author_names_only,
                    # Some ids are returned in bad format, so we need to split
                    "id": pubmed_id.split('\n')[0],
                }

                # Append to results array
                json_results.append(response_data)

        # Use jsonify to convert the list into a JSON response
        return jsonify({
            "status": "OK",
            "message": "Request was successful",
            "_items": json_results
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
            '# <intervention (or comparison of interventions)> / <disease> / <effectiveness of the intervention>:'

        query_result = chatbot.query(baseQuery + prompt)

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
