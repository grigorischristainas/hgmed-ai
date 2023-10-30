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
import CardDialog from './components/CardDialog'
import useDialog from './hooks/useDialog'

export const PaperCard = ({ pubMedResult }: PaperCardProps) => {
    const {
        title,
        summary: { disease, effectiveness, intervention },
        abstract,
    } = pubMedResult

    const { dialogOpen, handleDialogClose, handleInfoIconClick } = useDialog()

    return (
        <>
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
                            <StyledInfoIcon onClick={handleInfoIconClick} />
                        </StyledInfoIconContainer>
                    </StyledContentContainer>
                </CardContent>
            </StyledCard>
            <CardDialog
                open={dialogOpen}
                handleClose={handleDialogClose}
                titleContent={
                    <StyledSectionContainer>
                        <DescriptionIcon />
                        <StyledTitle variant="body1">{title}</StyledTitle>
                    </StyledSectionContainer>
                }
                abstract={abstract}
            />
        </>
    )
}

export default React.memo(PaperCard)
