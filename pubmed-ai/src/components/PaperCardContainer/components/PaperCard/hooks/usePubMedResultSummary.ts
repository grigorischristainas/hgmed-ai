import { UseQueryResult, useQuery } from '@tanstack/react-query'
import fetchPubMedResultSummary, {
    FetchPubMedResultSummaryReturn,
} from '../../../../../services/fetchPubMedResultSummary'
import { useLocalStorage } from '@uidotdev/usehooks'

export type UsePubMedResultSummaryProps = {
    id: string
    prompt: string
}

const usePubMedResultSummary = ({
    id,
    prompt,
}: UsePubMedResultSummaryProps): UseQueryResult<
    FetchPubMedResultSummaryReturn,
    Error
> => {
    const [accessToken] = useLocalStorage<string>('token')

    return useQuery({
        queryKey: ['summary', id],
        queryFn: () =>
            fetchPubMedResultSummary({ prompt: prompt, accessToken }),
        staleTime: Infinity,
    })
}

export default usePubMedResultSummary
