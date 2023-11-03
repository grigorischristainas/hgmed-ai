import axios from 'axios'
import { API_URL } from '../config'
import { PubMedResult } from '../components/PaperCardContainer/hooks/usePubMedResults'

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
    }

    const { data } = await axios.post(`${API_URL}/studies/rct`, body)

    return data
}

export default fetchPubMedResults
