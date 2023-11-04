import { UseMutationResult, useMutation } from '@tanstack/react-query'
import fetchPubMedResultSummary, {
    FetchPubMedResultSummaryProps,
    FetchPubMedResultSummaryReturn,
} from '../../../../../services/fetchPubMedResultSummary'

const usePubMedResultSummary = (): UseMutationResult<
    FetchPubMedResultSummaryReturn,
    Error,
    FetchPubMedResultSummaryProps,
    unknown
> => {
    return useMutation({
        mutationFn: fetchPubMedResultSummary,
    })
}

export default usePubMedResultSummary
