import useSearchKeyword from '../../hooks/useSearchKeyword'
import Description from '../Description'
import PaperCardContainer from '../PaperCardContainer'
import SearchBox from '../SearchBox'
import Title from '../Title'
import { StyledRootContainer, StyledContent } from './HomeStyles'

const Home = () => {
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

export default Home
