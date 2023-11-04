import React from 'react'
import { PaperCardContainerProps } from './types'
import {
    StyledMoreButton,
    StyledRootContainer,
} from './PaperCardContainerStyles'
import PaperCard from './components/PaperCard'
import usePubMedResultChunks from './hooks/usePubMedResultChunks'

const PaperCardContainer = ({ pubMedResults }: PaperCardContainerProps) => {
    const {
        handleLoadMoreButtonClick,
        isLoadMoreButtonDisabled,
        renderedResults,
    } = usePubMedResultChunks({ pubMedResults })

    return (
        <StyledRootContainer>
            {renderedResults.map((result) => (
                <PaperCard pubMedResult={result} key={result.id} />
            ))}
            <StyledMoreButton
                variant="contained"
                onClick={handleLoadMoreButtonClick}
                disabled={isLoadMoreButtonDisabled}
            >
                Load more
            </StyledMoreButton>
        </StyledRootContainer>
    )
}

export default React.memo(PaperCardContainer)
