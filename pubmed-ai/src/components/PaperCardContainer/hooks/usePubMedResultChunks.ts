import React from 'react'
import getResultChunks from '../utils/getResultChunks'
import { PaperCardContainerProps } from '../types'
import { PubMedResult } from '../../../lib/types'

export type UsePubMedResultChunksProps = Pick<
    PaperCardContainerProps,
    'pubMedResults'
>

export type UsePubMedResultChunksReturn = {
    renderedResults: PubMedResult[]
    handleLoadMoreButtonClick: () => void
    isLoadMoreButtonDisabled: boolean
}

const usePubMedResultChunks = ({
    pubMedResults,
}: UsePubMedResultChunksProps): UsePubMedResultChunksReturn => {
    const [currentChunkIndex, setCurrentChunkIndex] = React.useState(1)
    const chunkedPubMedResults = getResultChunks(pubMedResults, 2)

    const renderedResults = React.useMemo(
        () => chunkedPubMedResults.slice(0, currentChunkIndex).flat(),
        [chunkedPubMedResults, currentChunkIndex]
    )

    const handleLoadMoreButtonClick = React.useCallback(() => {
        setCurrentChunkIndex(currentChunkIndex + 1)
    }, [currentChunkIndex])

    const isLoadMoreButtonDisabled = React.useMemo(
        () => currentChunkIndex >= chunkedPubMedResults.length,
        [chunkedPubMedResults.length, currentChunkIndex]
    )

    return {
        renderedResults,
        handleLoadMoreButtonClick,
        isLoadMoreButtonDisabled,
    }
}

export default usePubMedResultChunks
