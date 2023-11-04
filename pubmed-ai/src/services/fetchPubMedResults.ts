import axios from 'axios'
import { API_URL } from '../lib/config'
import { PubMedResult } from '../lib/types'

export type FetchPubMedResultsProps = {
    keyword: string
}

export type FetchPubMedResultsReturn = {
    _items: PubMedResult[]
    status: string
    message: string
}

const fetchPubMedResults = async ({
    keyword,
}: FetchPubMedResultsProps): Promise<FetchPubMedResultsReturn> => {
    const body = {
        keyword: keyword,
        config: {
            maxResults: 2,
        },
    }

    const { data } = await axios.post(`${API_URL}/studies/rct`, body)

    return data
}

export default fetchPubMedResults
