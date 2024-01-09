# Getting Started

This is the Flask based hugmed-ai API. It utilizes the following APIs:

1. PubMed API
2. HuggingChat API

Currently, the free HuggingChat API is supported, but ChatGPT API may also be added in the future.

# Installation

1. Clone the project and install the required requirements:

```
pip install -r requirements.txt
```

2. Copy example.env to .env:

```
cp example.env .env
```

and include the secret values (can be any string, you can create the values using the `secrets` python package) along with your HuggingChat credentials (register here: https://huggingface.co/chat/) and the corresponding Gmail App Password and Username. App passwords can be used with less secure apps and Two factor authentication
must be enabled in order to be able to create one. More information can be found here: https://myaccount.google.com/apppasswords. Gmail account is used to send the registration confirmation email.

Moreover, a PubMed API key can be obtained from the NCBI account (https://support.nlm.nih.gov/knowledgebase/article/KA-05317/en-us).

Finally MongoDB should be up and running (A MongoDB Atlas instance can be created). Please also fill the corresponding credentials in this file.

3. Run the application

```
python main.py
```
