import { PubMedResult } from '../../../../hooks/usePubMedResults'

export type CardDialogProps = {
    open: boolean
    handleClose: () => void
    titleContent: JSX.Element
} & Pick<PubMedResult, 'abstract' | 'authors' | 'publicationDate' | 'id'>
