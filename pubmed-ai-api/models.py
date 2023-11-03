PubMedResultsPostSchema = {
    'keyword': {
        'type': 'string',
        'required': True
    },
    'config': {
        'type': 'dict',
        'required': False,
        'schema': {
            'maxResults': {
                'type': 'number',
                'required': False
            },

        }
    }
}

AbstractSummaryPostSchema = {
    'prompt': {
        'type': 'string',
        'required': True
    },
}
