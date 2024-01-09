import React from 'react'
import { StyledTitle } from './TitleStyles'

const Title = () => {
    return (
        <StyledTitle variant="h3" gutterBottom>
            Your personal AI PubMed Assistant
        </StyledTitle>
    )
}

export default React.memo(Title)
