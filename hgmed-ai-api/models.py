PubMedResultsArgsSchema = {
    'keyword': {
        'type': 'string',
        'required': True,
        'maxlength': 100
    },
    'page': {
        'type': 'string',
        'required': True
    },
    'maxResults': {
        'type': 'string',
        'required': True
    },
}


AbstractSummaryPostSchema = {
    'prompt': {
        'type': 'string',
        'required': True,
        'maxlength': 5000
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

EmailTokenVerifyArgsSchema = {
    'token': {
        'type': 'string',
        'required': True,
    },
}
