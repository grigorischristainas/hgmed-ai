import React from 'react'
import { PaperCardContainerProps } from './types'
import { StyledRootContainer } from './PaperCardContainerStyles'
import PaperCard from './components/PaperCard'

const PaperCardContainer = ({ pubMedResults }: PaperCardContainerProps) => {
    return (
        <StyledRootContainer>
            {pubMedResults.map((result) => (
                <PaperCard pubMedResult={result} key={result.id} />
            ))}
        </StyledRootContainer>
    )
}

export default React.memo(PaperCardContainer)
