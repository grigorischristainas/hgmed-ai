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

UserRegistrationSchema = {
    'email': {
        'type': 'string',
        'required': True,
        'minlength': 1,
        'maxlength': 30
    },
    'password': {
        'type': 'string',
        'required': True,
        'minlength': 5,
        'maxlength': 20
    }
}
