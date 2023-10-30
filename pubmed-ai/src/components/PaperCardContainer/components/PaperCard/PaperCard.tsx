import React from 'react'
import CardContent from '@mui/material/CardContent'
import { StyledCard } from './PaperCardStyles'
import { PaperCardProps } from './types'

export const PaperCard = ({ pubMedResult }: PaperCardProps) => {
    const {
        title,
        summary: { disease, effectiveness, intervention },
    } = pubMedResult

    return (
        <StyledCard>
            <CardContent>
                <div>{title}</div>
                <div>{disease}</div>
                <div>{intervention}</div>
                <div>{effectiveness}</div>
            </CardContent>
        </StyledCard>
    )
}

export default React.memo(PaperCard)
