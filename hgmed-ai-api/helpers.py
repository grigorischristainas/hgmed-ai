from itsdangerous import URLSafeTimedSerializer
from flask import render_template
from config import mail
import requests
import time
import xml.etree.ElementTree as ET
import os
from flask_mail import Message

PUBMED_API_KEY = os.environ.get('PUBMED_API_KEY')
ITSDNGRS_SALT = os.environ.get('ITSDNGRS_SALT')
ITSDNGRS_SECRET_KEY = os.environ.get('ITSDNGRS_SECRET_KEY')


def getPubMedPaperAbstract(paper_id):
    efetch_base_url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi'
    efetch_url = f'{efetch_base_url}?db=pubmed&id={paper_id}&retmode=xml&'\
        f'&api_key={PUBMED_API_KEY}'

    response = requests.get(efetch_url)

    xml_data = response.text
    root = ET.fromstring(xml_data)

    abstract_elements = root.findall('.//AbstractText')

    try:
        if abstract_elements:
            abstract = '\n'.join(abstract_element.text.strip()
                                 for abstract_element in abstract_elements)
            if (len(abstract) >= 50):
                return abstract
    except Exception as e:
        return None

    return None


def getPubMedPaperIds(keyword, page, max_results):
    retstart = int(max_results) * int(page)

    term = keyword + '+AND+randomizedcontrolledtrial[Filter]'
    esearch_base_url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi'
    esearch_url = f'{esearch_base_url}?db=pubmed&term={term}&retmode=json&retstart={retstart}'\
        f'&retmax={max_results}'\
        f'&api_key={PUBMED_API_KEY}'

    pubmed_paper_results = requests.get(esearch_url).json()

    try:
        pubmed_paper_ids = pubmed_paper_results.get(
            'esearchresult').get('idlist')
        pubmed_papers_count = pubmed_paper_results.get(
            'esearchresult').get('count')

        return pubmed_paper_ids, pubmed_papers_count
    except Exception as e:
        return None, None


def getPubMedPaperSummary(paper_id):
    esummary_base_url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi'
    esummary_url = f'{esummary_base_url}?db=pubmed&id={paper_id}&retmode=json&'\
        f'&api_key={PUBMED_API_KEY}'
    pubmed_paper_summary = requests.get(esummary_url).json()

    pubmed_paper_title = pubmed_paper_summary.get(
        'result').get(paper_id).get('title')
    pubmed_paper_pubdate = pubmed_paper_summary.get(
        'result').get(paper_id).get('pubdate')
    pubmed_paper_author_info = pubmed_paper_summary.get(
        'result').get(paper_id).get('authors')

    try:
        pubmed_paper_authors = []
        for author in pubmed_paper_author_info:
            pubmed_paper_authors.append(author.get('name'))

        return pubmed_paper_title, pubmed_paper_pubdate, pubmed_paper_authors
    except Exception as e:
        return None


def getPubMedPapers(keyword, page, max_results):
    pubmed_paper_ids, pubmed_papers_count = getPubMedPaperIds(
        keyword, page, max_results)

    items = []

    for paper_id in pubmed_paper_ids:
        time.sleep(0.5)

        pubmed_paper_title, pubmed_paper_pubdate, pubmed_paper_authors = getPubMedPaperSummary(
            paper_id)

        time.sleep(0.5)

        abstract = getPubMedPaperAbstract(paper_id)
        if (pubmed_paper_title and pubmed_paper_pubdate and pubmed_paper_authors and abstract):
            items.append({
                'title': pubmed_paper_title,
                'publicationDate': pubmed_paper_pubdate,
                'authors': pubmed_paper_authors,
                'abstract': abstract,
                'id': paper_id
            })

    return items, pubmed_papers_count


def send_verification_email(email):
    if (email):
        msg = Message('Verify your email address', sender=('HgMed AI', 'hgchatdemomedai@gmail.com'),
                      recipients=[email])

        token = generate_verification_token(email)

        msg.html = render_template(
            'email_verification_template.html', href="https://hgmed-ai.netlify.app/verify?token=" + token)
        mail.send(msg)


def generate_verification_token(email):
    serializer = URLSafeTimedSerializer(ITSDNGRS_SECRET_KEY)
    return serializer.dumps(email, salt=ITSDNGRS_SALT)


def confirm_verification_token(token):
    expiration = 365 * 24 * 60 * 60

    serializer = URLSafeTimedSerializer(ITSDNGRS_SECRET_KEY)
    try:
        email = serializer.loads(
            token, salt=ITSDNGRS_SALT, max_age=expiration
        )
        return email
    except Exception:
        return False


def isResultQueryInvalid(query):
    if ('<disease>' in str(query)):
        return True

    return False
