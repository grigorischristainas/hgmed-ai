import React from 'react'
import PaperCardContainer from './components/PaperCardContainer'
import Title from './components/Title'
import SearchBox from './components/SearchBox'
import { StyledContent, StyledRootContainer } from './AppStyles'
import Description from './components/Description'
import useSearchKeyword from './hooks/useSearchKeyword'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
    const { handleSearch, searchKeyword } = useSearchKeyword()

    return (
        <QueryClientProvider client={queryClient}>
            <StyledRootContainer>
                <StyledContent>
                    <Title />
                    <Description />
                    <SearchBox handleSearch={handleSearch} />
                    {searchKeyword && (
                        <PaperCardContainer keyword={searchKeyword} />
                    )}
                </StyledContent>
            </StyledRootContainer>
        </QueryClientProvider>
    )
}

export default App
