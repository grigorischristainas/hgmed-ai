import React from 'react'
import PaperCardContainer from './components/PaperCardContainer'
import Title from './components/Title'
import SearchBox from './components/SearchBox'
import { StyledContent, StyledRootContainer } from './AppStyles'
import Description from './components/Description'
import useSearchKeyword from './hooks/useSearchKeyword'
import CircularProgress from '@mui/material/CircularProgress'

function App() {
    const { handleSearch, data, isLoading, isError } = useSearchKeyword()

    return (
        <StyledRootContainer>
            <StyledContent>
                <Title />
                <Description />
                <SearchBox
                    handleSearch={handleSearch}
                    isSearchDisabled={isLoading}
                />
                {isLoading && <CircularProgress size={24} />}
                {isError && <div>Something went wrong. Please try again</div>}
                {data && data._items.length === 0 && (
                    <div>No results found</div>
                )}
                {data && data._items.length > 0 && (
                    <PaperCardContainer pubMedResults={data._items} />
                )}
            </StyledContent>
        </StyledRootContainer>
    )
}

export default App
