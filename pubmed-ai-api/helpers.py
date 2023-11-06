import requests
import time
import xml.etree.ElementTree as ET
import os

PUBMED_API_KEY = os.environ.get('PUBMED_API_KEY')


def getPubMedPaperAbstract(paper_id):
    time.sleep(1)

    efetch_base_url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi'
    efetch_url = f'{efetch_base_url}?db=pubmed&id={paper_id}&retmode=xml&'\
        f'&api_key={PUBMED_API_KEY}'

    response = requests.get(efetch_url)

    xml_data = response.text
    root = ET.fromstring(xml_data)

    abstract_elements = root.findall('.//AbstractText')

    if abstract_elements:
        abstract = '\n'.join(abstract_element.text.strip()
                             for abstract_element in abstract_elements)
        if (len(abstract) >= 50):
            return abstract

    return ''


def getPubMedPaperIds(keyword, page, max_results):
    time.sleep(1)

    retstart = page
    if (int(page) > 0):
        retstart = int(page) + 1

    term = keyword + '+AND+randomizedcontrolledtrial[Filter]'
    esearch_base_url = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi'
    esearch_url = f'{esearch_base_url}?db=pubmed&term={term}&retmode=json&retstart={retstart}'\
        f'&retmax={max_results}'\
        f'&api_key={PUBMED_API_KEY}'

    pubmed_paper_results = requests.get(esearch_url).json()

    pubmed_paper_ids = pubmed_paper_results.get(
        'esearchresult').get('idlist')
    pubmed_papers_count = pubmed_paper_results.get(
        'esearchresult').get('count')

    return pubmed_paper_ids, pubmed_papers_count


def getPubMedPaperSummary(paper_id):
    time.sleep(1)

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

    pubmed_paper_authors = []
    for author in pubmed_paper_author_info:
        pubmed_paper_authors.append(author.get('name'))

    return pubmed_paper_title, pubmed_paper_pubdate, pubmed_paper_authors


def getPubMedPapers(keyword, page, max_results):
    pubmed_paper_ids, pubmed_papers_count = getPubMedPaperIds(
        keyword, page, max_results)

    items = []

    for paper_id in pubmed_paper_ids:
        time.sleep(1)

        pubmed_paper_title, pubmed_paper_pubdate, pubmed_paper_authors = getPubMedPaperSummary(
            paper_id)

        time.sleep(1)

        abstract = getPubMedPaperAbstract(paper_id)

        items.append({
            'title': pubmed_paper_title,
            'publicationDate': pubmed_paper_pubdate,
            'authors': pubmed_paper_authors,
            'abstract': abstract,
            'id': paper_id
        })

    return items, pubmed_papers_count
