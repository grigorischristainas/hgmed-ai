import { UseMutationResult, useMutation } from '@tanstack/react-query'
import fetchPubMedResults, {
    FetchPubMedResultsProps,
    FetchPubMedResultsReturn,
} from '../services/fetchPubMedResults'

const usePubMedResults = (): UseMutationResult<
    FetchPubMedResultsReturn,
    Error,
    FetchPubMedResultsProps,
    unknown
> => {
    return useMutation({
        mutationFn: fetchPubMedResults,
    })
}

export default usePubMedResults
