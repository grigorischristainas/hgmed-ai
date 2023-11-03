import { PubMedResult } from '../../../hooks/usePubMedResults'

export type PaperSummary = {
    intervention: string
    disease: string
    effectiveness: string
}

export type UseSummaryProps = Pick<PubMedResult, 'abstract'>

const useSummary = () => {
    // TODO: Utilize react query to retrieve abstract summary
    // from API
}

export default useSummary
