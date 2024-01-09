import axios from 'axios'
import { API_URL } from '../lib/config'
import { PubMedResult } from '../lib/types'

export type FetchPubMedResultsProps = {
    keyword: string
    pageParam: number
    accessToken: string
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
    accessToken,
}: FetchPubMedResultsProps): Promise<FetchPubMedResultsReturn> => {
    const { data } = await axios.get(
        `${API_URL}/studies/rct?keyword=${keyword}&page=${pageParam}&maxResults=2`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        }
    )

    return data
}

export default fetchPubMedResults
