import { useInfiniteQuery } from '@tanstack/react-query'
import fetchPubMedResults, {
    FetchPubMedResultsReturn,
} from '../services/fetchPubMedResults'

export type UsePubMedResultsProps = {
    keyword: string
    enabled: boolean
}

const usePubMedResults = ({ keyword, enabled }: UsePubMedResultsProps) => {
    return useInfiniteQuery<FetchPubMedResultsReturn, Error>({
        queryKey: ['pubmed', keyword],
        queryFn: async (props) => {
            const pageParam = props.pageParam as number
            return fetchPubMedResults({ keyword, pageParam })
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage._meta.page + 1,
        enabled: enabled,
        staleTime: Infinity,
    })
}

export default usePubMedResults
