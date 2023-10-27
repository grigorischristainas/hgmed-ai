from flask import request, jsonify
from config import app, chatbot, pubmed


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
            title = article.title.encode('utf-8')
            abstract = article.abstract.encode('utf-8')

            response_data = {
                "title": str(title.decode('utf-8').replace('\n', '')),
                "abstract": str(abstract.decode('utf-8').replace('\n', ''))
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
