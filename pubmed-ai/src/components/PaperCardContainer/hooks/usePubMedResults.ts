import { dummyResults } from '../consts'
import { PaperCardContainerProps } from '../types'

export type PubMedResult = {
    id: number
    title: string
    abstract: string
}

export type UsePubMedResultsProps = Pick<PaperCardContainerProps, 'keyword'>
export type UsePubMedResultsReturn = {
    pubMedResults: PubMedResult[]
}

const usePubMedResults = ({
    keyword,
}: UsePubMedResultsProps): UsePubMedResultsReturn => {
    // TODO: Request to back-end API

    const pubMedResults = dummyResults
    return { pubMedResults }
}

export default usePubMedResults
