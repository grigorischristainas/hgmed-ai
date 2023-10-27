# Getting Started

This is the Flask based pubmed AI API. It utilizes the following APIs:

1. PubMED API
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

and include your HuggingChat credentials - you can register here: https://huggingface.co/chat/

3. Run the application

```
python main.py
```
