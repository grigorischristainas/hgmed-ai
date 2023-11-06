import axios from 'axios'
import { API_URL } from '../lib/config'
import { PubMedResult } from '../lib/types'

export type FetchPubMedResultsProps = {
    keyword: string
    pageParam: number
}

export type FetchPubMedResultsReturn = {
    _items: PubMedResult[]
    status: string
    message: string
    _meta: {
        max: number
        page: number
        total: number
    }
}

const fetchPubMedResults = async ({
    keyword,
    pageParam,
}: FetchPubMedResultsProps): Promise<FetchPubMedResultsReturn> => {
    const { data } = await axios.get(
        `${API_URL}/studies/rct?keyword=${keyword}&page=${pageParam}&maxResults=2`
    )

    return data
}

export default fetchPubMedResults
