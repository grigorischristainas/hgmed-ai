import React from 'react'
import getResultChunks from '../utils/getResultChunks'
import { PaperCardContainerProps } from '../types'
import { PubMedResult } from '../../../lib/types'
import { useQueryClient } from '@tanstack/react-query'

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
    const [isLoadingOrError, setIsLoadingOrError] = React.useState(true)

    const queryClient = useQueryClient()

    const chunkedPubMedResults = getResultChunks(pubMedResults, 2)

    const renderedResults = React.useMemo(
        () => chunkedPubMedResults.slice(0, currentChunkIndex).flat(),
        [chunkedPubMedResults, currentChunkIndex]
    )

    const handleLoadMoreButtonClick = React.useCallback(() => {
        setCurrentChunkIndex(currentChunkIndex + 1)
        setIsLoadingOrError(true)
    }, [currentChunkIndex])

    const isLoadMoreButtonDisabled = React.useMemo(
        () =>
            isLoadingOrError ||
            currentChunkIndex >= chunkedPubMedResults.length,
        [chunkedPubMedResults.length, currentChunkIndex, isLoadingOrError]
    )

    React.useEffect(() => {
        const unsubscribe = queryClient.getQueryCache().subscribe(() => {
            const queriesStatus = renderedResults.map((result) => {
                const cachedData = queryClient.getQueryData([
                    'summary',
                    result.id,
                ])
                return cachedData !== undefined
            })
            setIsLoadingOrError(
                queriesStatus.some((status) => status === false)
            )
        })

        return () => {
            unsubscribe()
        }
    }, [queryClient, renderedResults])

    return {
        renderedResults,
        handleLoadMoreButtonClick,
        isLoadMoreButtonDisabled,
    }
}

export default usePubMedResultChunks
