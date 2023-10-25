import React from 'react'
import { StyledTitle } from './TitleStyles'

const Title = () => {
    return (
        <div>
            <StyledTitle variant="h3" gutterBottom>
                Your personal AI PubMED Assistant
            </StyledTitle>
        </div>
    )
}

export default React.memo(Title)
