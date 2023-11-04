import { PubMedResult } from '../../../../../../lib/types'

export type CardDialogProps = {
    open: boolean
    handleClose: () => void
    titleContent: JSX.Element
} & Pick<PubMedResult, 'abstract' | 'authors' | 'publicationDate' | 'id'>
