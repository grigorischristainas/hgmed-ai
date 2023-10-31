import { dummyResults } from '../../../consts'
import { PubMedResult } from '../../../hooks/usePubMedResults'

export type PaperSummary = {
    intervention: string
    disease: string
    effectiveness: string
}

export type UseSummaryProps = Pick<PubMedResult, 'title' | 'abstract'>

export type UseSummaryReturn = {
    paperSummary: PaperSummary
}

const useSummary = ({ title }: UseSummaryProps): UseSummaryReturn => {
    // TODO: Request to back-end API

    const paperSummary = dummyResults.filter(
        (result) => result.title === title
    )[0].summary

    return { paperSummary }
}

export default useSummary
