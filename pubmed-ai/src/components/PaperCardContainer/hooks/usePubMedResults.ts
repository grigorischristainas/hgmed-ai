import { UseMutationResult, useMutation } from '@tanstack/react-query'
import fetchPubMedResults, {
    FetchPubMedResultsProps,
    FetchPubMedResultsReturn,
} from '../../../services/fetchPubMedResults'

export type PubMedResult = {
    id: number
    title: string
    abstract: string
    publicationDate: string
    authors: string[]
}

export type UsePubMedResultsReturn = {
    pubMedResults: PubMedResult[]
}

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
