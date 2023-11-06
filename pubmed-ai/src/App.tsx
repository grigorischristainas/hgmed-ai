import React from 'react'
import PaperCardContainer from './components/PaperCardContainer'
import Title from './components/Title'
import SearchBox from './components/SearchBox'
import { StyledContent, StyledRootContainer } from './AppStyles'
import Description from './components/Description'
import useSearchKeyword from './hooks/useSearchKeyword'

function App() {
    const { handleSearch, keyword, enabled } = useSearchKeyword()

    return (
        <StyledRootContainer>
            <StyledContent>
                <Title />
                <Description />
                <SearchBox
                    handleSearch={handleSearch}
                    isSearchDisabled={false}
                />
                {enabled && <PaperCardContainer keyword={keyword} />}
            </StyledContent>
        </StyledRootContainer>
    )
}

export default App
