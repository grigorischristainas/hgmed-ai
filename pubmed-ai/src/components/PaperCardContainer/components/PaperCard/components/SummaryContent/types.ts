import { FetchPubMedResultSummaryReturn } from '../../../../../../services/fetchPubMedResultSummary'

export type SummaryContentProps = {
    loading: boolean
    data: FetchPubMedResultSummaryReturn | undefined
}
