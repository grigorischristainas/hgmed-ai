import { dummyResults } from '../consts'
import { PaperCardContainerProps } from '../types'

export type PaperSummary = {
    intervention: string
    disease: string
    effectiveness: string
}

export type PubMedResult = {
    id: number
    title: string
    abstract: string
    summary: PaperSummary
}

export type UsePubMedResultsProps = Pick<PaperCardContainerProps, 'keyword'>
export type UsePubMedResultsReturn = {
    pubMedResults: PubMedResult[]
}

const usePubMedResults = ({
    keyword,
}: UsePubMedResultsProps): UsePubMedResultsReturn => {
    const pubMedResults = dummyResults
    return { pubMedResults }
}

export default usePubMedResults
