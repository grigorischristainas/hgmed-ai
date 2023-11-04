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
    StyledSkeletonIconContainer,
} from './PaperCardStyles'
import { PaperCardProps } from './types'
import DescriptionIcon from '@mui/icons-material/Description'
import CardDialog from './components/CardDialog'
import useDialog from './hooks/useDialog'
// import useSummary from './hooks/useSummary'
import Skeleton from 'react-loading-skeleton'

export const PaperCard = ({ pubMedResult }: PaperCardProps) => {
    const { title, abstract, authors, id, publicationDate } = pubMedResult

    // TODO: Remove after API request integration
    const loading = true
    // const {
    //     paperSummary: { disease, effectiveness, intervention },
    // } = useSummary({ title, abstract })

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
                                {loading ? (
                                    <>
                                        <StyledSkeletonIconContainer>
                                            <Skeleton
                                                circle
                                                containerClassName="skeleton"
                                            />
                                        </StyledSkeletonIconContainer>
                                        <Skeleton containerClassName="skeleton" />
                                    </>
                                ) : (
                                    <>
                                        <StyledDiseaseIcon />
                                        <div>disease</div>
                                    </>
                                )}
                            </StyledSectionContainer>

                            <StyledSectionContainer>
                                {loading ? (
                                    <>
                                        <StyledSkeletonIconContainer>
                                            <Skeleton
                                                circle
                                                containerClassName="skeleton"
                                            />
                                        </StyledSkeletonIconContainer>
                                        <Skeleton containerClassName="skeleton" />
                                    </>
                                ) : (
                                    <>
                                        <StyledInterventionIcon />
                                        <div>intervention</div>
                                    </>
                                )}
                            </StyledSectionContainer>

                            <StyledSectionContainer>
                                {loading ? (
                                    <>
                                        <StyledSkeletonIconContainer>
                                            <Skeleton
                                                circle
                                                containerClassName="skeleton"
                                            />
                                        </StyledSkeletonIconContainer>
                                        <Skeleton containerClassName="skeleton" />
                                    </>
                                ) : (
                                    <>
                                        <StyledEffectivenessIcon />
                                        <div>effectiveness</div>
                                    </>
                                )}
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
                authors={authors}
                publicationDate={publicationDate}
                id={id}
            />
        </>
    )
}

export default React.memo(PaperCard)
