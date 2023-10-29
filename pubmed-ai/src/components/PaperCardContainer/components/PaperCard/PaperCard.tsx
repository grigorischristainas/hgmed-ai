import React from 'react'
import CardContent from '@mui/material/CardContent'
import { StyledCard } from './PaperCardStyles'

export const PaperCard = () => {
    return (
        <StyledCard>
            <CardContent>
                <div>PaperCard is rendered!</div>
            </CardContent>
        </StyledCard>
    )
}

export default React.memo(PaperCard)
