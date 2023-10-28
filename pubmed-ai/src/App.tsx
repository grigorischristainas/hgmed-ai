import React from 'react'
import PaperCardContainer from './components/PaperCardContainer'
import Title from './components/Title'
import SearchBox from './components/SearchBox'
import { StyledRootContainer } from './AppStyles'
import Description from './components/Description'
import useSearchKeyword from './hooks/useSearchKeyword'

function App() {
    const { handleSearch, searchKeyword } = useSearchKeyword()

    return (
        <StyledRootContainer>
            <Title />
            <Description />
            <SearchBox handleSearch={handleSearch} />
            {searchKeyword && <PaperCardContainer keyword={searchKeyword} />}
        </StyledRootContainer>
    )
}

export default App
