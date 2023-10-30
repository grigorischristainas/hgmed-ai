import React from 'react'
import CardContent from '@mui/material/CardContent'
import {
    StyledCard,
    StyledTitle,
    StyledSectionContainer,
    StyledSummaryContainer,
    StyledDiseaseIcon,
    StyledInterventionIcon,
    StyledEffectivenessIcon,
    StyledInfoIcon,
    StyledInfoIconContainer,
    StyledContentContainer,
} from './PaperCardStyles'
import { PaperCardProps } from './types'
import DescriptionIcon from '@mui/icons-material/Description'

export const PaperCard = ({ pubMedResult }: PaperCardProps) => {
    const {
        title,
        summary: { disease, effectiveness, intervention },
    } = pubMedResult

    return (
        <StyledCard>
            <CardContent>
                <StyledSectionContainer>
                    <DescriptionIcon />
                    <StyledTitle variant="body1">{title}</StyledTitle>
                </StyledSectionContainer>

                <StyledContentContainer>
                    <StyledSummaryContainer>
                        <StyledSectionContainer>
                            <StyledDiseaseIcon />
                            <div>{disease}</div>
                        </StyledSectionContainer>

                        <StyledSectionContainer>
                            <StyledInterventionIcon />
                            <div>{intervention}</div>
                        </StyledSectionContainer>

                        <StyledSectionContainer>
                            <StyledEffectivenessIcon />
                            <div>{effectiveness}</div>
                        </StyledSectionContainer>
                    </StyledSummaryContainer>
                    <StyledInfoIconContainer>
                        <StyledInfoIcon />
                    </StyledInfoIconContainer>
                </StyledContentContainer>
            </CardContent>
        </StyledCard>
    )
}

export default React.memo(PaperCard)
