import {
    UseMutationResult,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query'
import fetchPubMedResultSummary, {
    FetchPubMedResultSummaryProps,
    FetchPubMedResultSummaryReturn,
} from '../../../../../services/fetchPubMedResultSummary'

const usePubMedResultSummary = ({
    id,
}: {
    id: string
}): UseMutationResult<
    FetchPubMedResultSummaryReturn,
    Error,
    FetchPubMedResultSummaryProps,
    unknown
> => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: fetchPubMedResultSummary,
        onSuccess: (data) =>
            queryClient.setQueryData(['summary', id], data._items),
        onError: () => queryClient.setQueryData(['summary', id], []),
    })
}

export default usePubMedResultSummary
