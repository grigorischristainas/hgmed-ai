import React from 'react'
import { PaperCardContainerProps } from './types'
import { StyledRootContainer } from './PaperCardContainerStyles'
import PaperCard from './components/PaperCard'
import usePubMedResults from './hooks/usePubMedResults'
import { CircularProgress } from '@mui/material'

const PaperCardContainer = ({ keyword }: PaperCardContainerProps) => {
    const { mutate, status, data } = usePubMedResults()

    React.useEffect(() => {
        mutate({ keyword })
    }, [keyword, mutate])

    if (status === 'pending') {
        return <CircularProgress size={24} />
    }

    if (data && data._items.length === 0) {
        return <div>No results found</div>
    }

    console.log('DATA ', data)
    return (
        <StyledRootContainer>
            {data?._items.map((result) => (
                <PaperCard pubMedResult={result} key={result.id} />
            ))}
        </StyledRootContainer>
    )
}

export default React.memo(PaperCardContainer)
