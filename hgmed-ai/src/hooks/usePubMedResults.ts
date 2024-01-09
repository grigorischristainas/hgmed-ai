import { useInfiniteQuery } from '@tanstack/react-query'
import fetchPubMedResults, {
    FetchPubMedResultsReturn,
} from '../services/fetchPubMedResults'
import { useLocalStorage } from '@uidotdev/usehooks'

export type UsePubMedResultsProps = {
    keyword: string
    enabled: boolean
}

const usePubMedResults = ({ keyword, enabled }: UsePubMedResultsProps) => {
    const [accessToken] = useLocalStorage<string>('token')

    return useInfiniteQuery<FetchPubMedResultsReturn, Error>({
        queryKey: ['pubmed', keyword],
        queryFn: async (props) => {
            const pageParam = props.pageParam as number
            return fetchPubMedResults({ keyword, pageParam, accessToken })
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage._meta.page + 1,
        enabled: enabled,
        staleTime: Infinity,
    })
}

export default usePubMedResults
