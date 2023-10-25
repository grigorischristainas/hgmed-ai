import React from 'react'
import PaperCardContainer from './components/PaperCardContainer'
import Title from './components/Title'
import SearchBox from './components/SearchBox'
import { StyledRootContainer } from './AppStyles'

function App() {
    return (
        <StyledRootContainer>
            <Title />
            <SearchBox />
            <PaperCardContainer />
        </StyledRootContainer>
    )
}

export default App
