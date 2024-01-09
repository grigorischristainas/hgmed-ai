import React from 'react'
import { PaperCardContainerProps } from './types'
import {
    StyledMoreButton,
    StyledRootContainer,
} from './PaperCardContainerStyles'
import PaperCard from './components/PaperCard'
import useScrollToEndOfCards from './hooks/useScrollToEndOfCards'
import usePubMedResults from '../../hooks/usePubMedResults'
import CircularProgress from '@mui/material/CircularProgress'

const PaperCardContainer = ({ keyword }: PaperCardContainerProps) => {
    const { status, data, fetchNextPage, isFetching } = usePubMedResults({
        keyword,
        enabled: true,
    })

    const isLoading = status === 'pending'
    const isError = status === 'error'
    const noData = data?.pages[0]._items.length === 0

    const { endOfCardsRef } = useScrollToEndOfCards({
        renderedResultsLength: data?.pages.length || 0,
    })

    return (
        <StyledRootContainer>
            {isLoading && <CircularProgress size={24} />}
            {isError && (
                <div>
                    There was an error retrieving results from PubMed. Please
                    try again later.
                </div>
            )}
            {noData && (
                <div>No results found, please try a different keyword</div>
            )}
            {!noData &&
                data?.pages.map((page) => (
                    <React.Fragment key={page._meta.page}>
                        {page._items.map((item) => (
                            <PaperCard pubMedResult={item} key={item.id} />
                        ))}
                    </React.Fragment>
                ))}
            {!noData && data && (
                <StyledMoreButton
                    variant="contained"
                    onClick={() => fetchNextPage()}
                    disabled={isFetching}
                    loading={isFetching}
                >
                    Load more
                </StyledMoreButton>
            )}
            <div ref={endOfCardsRef}></div>
        </StyledRootContainer>
    )
}

export default React.memo(PaperCardContainer)
