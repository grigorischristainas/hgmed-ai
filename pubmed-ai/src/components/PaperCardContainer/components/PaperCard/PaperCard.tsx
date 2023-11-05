import React from 'react'
import CardContent from '@mui/material/CardContent'
import {
    StyledCard,
    StyledTitle,
    StyledSectionContainer,
    StyledSummaryContainer,
    StyledInfoIcon,
    StyledInfoIconContainer,
    StyledContentContainer,
    StyledRefreshIcon,
} from './PaperCardStyles'
import { PaperCardProps } from './types'
import DescriptionIcon from '@mui/icons-material/Description'
import CardDialog from './components/CardDialog'
import useDialog from './hooks/useDialog'
import usePubMedResultSummary from './hooks/usePubMedResultSummary'
import ErrorContent from './components/ErrorContent'
import SummaryContent from './components/SummaryContent'
import IconButton from '@mui/material/IconButton'

export const PaperCard = ({ pubMedResult }: PaperCardProps) => {
    const { title, abstract, authors, id, publicationDate } = pubMedResult

    const { data, refetch, isError, isLoading, isFetching } =
        usePubMedResultSummary({
            id,
            prompt: abstract,
        })
    const { dialogOpen, handleDialogClose, handleInfoIconClick } = useDialog()

    const handleRefreshIconClick = React.useCallback(() => {
        refetch()
    }, [refetch])

    return (
        <>
            <StyledCard>
                <CardContent>
                    <div>
                        <StyledSectionContainer>
                            <DescriptionIcon />
                            <StyledTitle variant="body1">{title}</StyledTitle>
                        </StyledSectionContainer>

                        <StyledContentContainer>
                            <StyledSummaryContainer>
                                {!isError && (
                                    <SummaryContent
                                        loading={isLoading || isFetching}
                                        data={data}
                                    />
                                )}
                                {isError && (
                                    <ErrorContent handleRefetch={refetch} />
                                )}
                            </StyledSummaryContainer>
                            <StyledInfoIconContainer>
                                <IconButton
                                    size="small"
                                    disabled={isLoading || isFetching}
                                >
                                    <StyledRefreshIcon
                                        fontSize="inherit"
                                        onClick={handleRefreshIconClick}
                                    />
                                </IconButton>

                                <IconButton size="small">
                                    <StyledInfoIcon
                                        fontSize="inherit"
                                        onClick={handleInfoIconClick}
                                    />
                                </IconButton>
                            </StyledInfoIconContainer>
                        </StyledContentContainer>
                    </div>
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
