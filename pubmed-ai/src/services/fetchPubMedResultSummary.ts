import axios from 'axios'
import { API_URL } from '../lib/config'
import { PaperSummary } from '../lib/types'

export type FetchPubMedResultSummaryProps = {
    prompt: string
}

export type FetchPubMedResultSummaryReturn = {
    _items: PaperSummary[]
    status: string
    message: string
}

const fetchPubMedResultSummary = async ({
    prompt,
}: FetchPubMedResultSummaryProps): Promise<FetchPubMedResultSummaryReturn> => {
    const body = {
        prompt: prompt,
    }

    const { data } = await axios.post(
        `${API_URL}/ai/huggingchat/generate`,
        body
    )

    return data
}

export default fetchPubMedResultSummary
