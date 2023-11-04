import { UseQueryResult, useQuery } from '@tanstack/react-query'
import fetchPubMedResultSummary, {
    FetchPubMedResultSummaryReturn,
} from '../../../../../services/fetchPubMedResultSummary'

const usePubMedResultSummary = ({
    id,
    prompt,
}: {
    id: string
    prompt: string
}): UseQueryResult<FetchPubMedResultSummaryReturn, Error> => {
    return useQuery({
        queryKey: ['summary', id],
        queryFn: () => fetchPubMedResultSummary({ prompt: prompt }),
        staleTime: Infinity,
    })
}

export default usePubMedResultSummary
