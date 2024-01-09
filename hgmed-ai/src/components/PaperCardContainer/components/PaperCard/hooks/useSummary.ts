import { PubMedResult } from '../../../../../lib/types'

export type UseSummaryProps = Pick<PubMedResult, 'abstract'>

const useSummary = () => {
    // TODO: Utilize react query to retrieve abstract summary
    // from API
}

export default useSummary
