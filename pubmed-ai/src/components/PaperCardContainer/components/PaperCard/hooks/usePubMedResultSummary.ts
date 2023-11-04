import { UseQueryResult, useQuery } from '@tanstack/react-query'
import fetchPubMedResultSummary, {
    FetchPubMedResultSummaryReturn,
} from '../../../../../services/fetchPubMedResultSummary'

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
    return useQuery({
        queryKey: ['summary', id],
        queryFn: () => fetchPubMedResultSummary({ prompt: prompt }),
        staleTime: Infinity,
    })
}

export default usePubMedResultSummary
