import React from 'react'
import PaperCardContainer from './components/PaperCardContainer'
import Title from './components/Title'
import SearchBox from './components/SearchBox'

function App() {
    return (
        <div>
            <Title />
            <SearchBox />
            <PaperCardContainer />
        </div>
    )
}

export default App
