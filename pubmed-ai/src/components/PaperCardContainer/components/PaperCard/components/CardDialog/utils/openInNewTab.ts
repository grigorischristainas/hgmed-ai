import { PUBMED_URL } from '../../../../../../../lib/config'

const openInNewTab = (id: string): void => {
    const newWindow = window.open(
        PUBMED_URL + '/' + id,
        '_blank',
        'noopener,noreferrer'
    )
    if (newWindow) newWindow.opener = null
}

export default openInNewTab
