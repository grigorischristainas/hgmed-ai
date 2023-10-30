import React from 'react'
import { PaperCardContainerProps } from './types'
import { StyledRootContainer } from './PaperCardContainerStyles'
import PaperCard from './components/PaperCard'
import usePubMedResults from './hooks/usePubMedResults'

const PaperCardContainer = ({ keyword }: PaperCardContainerProps) => {
    const { pubMedResults } = usePubMedResults({ keyword })
    return (
        <StyledRootContainer>
            {pubMedResults.map((result) => (
                <PaperCard />
            ))}
        </StyledRootContainer>
    )
}

export default React.memo(PaperCardContainer)
