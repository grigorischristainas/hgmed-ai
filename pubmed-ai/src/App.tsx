import React from 'react'
import PaperCardContainer from './components/PaperCardContainer'
import Title from './components/Title'
import SearchBox from './components/SearchBox'
import { StyledRootContainer } from './AppStyles'
import Description from './components/Description'
import { SearchBoxProps } from './components/SearchBox/types'

function App() {
    const handleSearch = React.useCallback<SearchBoxProps['handleSearch']>(
        (keyword) => {
            console.log('Search: ', keyword)
        },
        []
    )

    return (
        <StyledRootContainer>
            <Title />
            <Description />
            <SearchBox handleSearch={handleSearch} />
            <PaperCardContainer />
        </StyledRootContainer>
    )
}

export default App
