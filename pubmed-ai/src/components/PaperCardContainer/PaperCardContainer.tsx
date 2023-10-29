import React from 'react'
import { PaperCardContainerProps } from './types'
import { StyledRootContainer } from './PaperCardContainerStyles'
import PaperCard from './components/PaperCard'
import { dummyResults } from './consts'

const PaperCardContainer = ({ keyword }: PaperCardContainerProps) => {
    return (
        <StyledRootContainer>
            {dummyResults.map((result) => (
                <PaperCard />
            ))}
        </StyledRootContainer>
    )
}

export default React.memo(PaperCardContainer)
