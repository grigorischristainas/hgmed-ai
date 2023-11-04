import { UseQueryResult, useQuery } from '@tanstack/react-query'
import fetchPubMedResults, {
    FetchPubMedResultsReturn,
} from '../services/fetchPubMedResults'

export type UsePubMedResultsProps = {
    keyword: string
    enabled: boolean
}

const usePubMedResults = ({
    keyword,
    enabled,
}: UsePubMedResultsProps): UseQueryResult<FetchPubMedResultsReturn, Error> => {
    return useQuery({
        queryKey: ['pubmed', keyword],
        queryFn: () => fetchPubMedResults({ keyword }),
        enabled: enabled,
        staleTime: Infinity,
    })
}

export default usePubMedResults
