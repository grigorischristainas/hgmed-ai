import axios from 'axios'
import { API_URL } from '../config'

type ResponseItems = {
    id: number
    title: string
    abstract: string
    publicationDate: string
    authors: string[]
}

export type FetchPubMedResultsProps = {
    keyword: string
}

export type FetchPubMedResultsReturn = {
    _items: ResponseItems[]
    status: string
    message: string
}

const fetchPubMedResults = async ({
    keyword,
}: FetchPubMedResultsProps): Promise<FetchPubMedResultsReturn> => {
    const body = {
        keyword: keyword,
    }

    const { data } = await axios.post(`${API_URL}/studies/rct`, body)

    return data
}

export default fetchPubMedResults
