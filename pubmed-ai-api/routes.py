from flask import request, jsonify
from config import app, chatbot, pubmed
import sys


@app.route('/studies/rct', methods=['POST'])
def get_papers():
    try:
        keyword = request.json['keyword']

        pubMedQuery = '("' + keyword + \
            '"[All Fields]) AND (randomizedcontrolledtrial[Filter])'

        results = pubmed.query(pubMedQuery, max_results=10)

        json_results = []

        for article in results:
            # Extract and format information from the article
            title = article.title
            abstract = article.abstract
            publication_date = article.publication_date
            authors = article.authors

            author_names_only = []

            for author in authors:
                author_first_name = author['firstname']
                author_last_name = author['lastname']
                author_name = author_first_name + ' ' + author_last_name
                author_names_only.append(author_name)

            response_data = {
                "title": title.replace('\n', ''),
                "abstract": abstract.replace('\n', ''),
                "publication_date": publication_date.strftime('%d/%m/%Y'),
                "authors": author_names_only
            }

            # Append to results array
            json_results.append(response_data)

        # Use jsonify to convert the list into a JSON response
        return jsonify(json_results)

    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/ai/huggingchat/generate', methods=['POST'])
def get_huggingchat_summary():
    try:
        prompt = request.json['prompt']

        baseQuery = 'Please identify very briefly for the following research the intervention ' \
            '(or comparison of interventions), the disease and the effectiveness of the intervention. ' \
            'Respond only in the following format with no extra text: ' \
            'SUMMARY: <intervention (or comparison of interventions)> / <disease> / <effectiveness of the intervention>:'

        query_result = chatbot.query(baseQuery + prompt)

        # Use jsonify to format JSON response
        return jsonify({'summary': str(query_result)})
    except Exception as e:
        return jsonify({'error': str(e)})
