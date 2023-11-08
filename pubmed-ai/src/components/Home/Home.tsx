import useSearchKeyword from '../../hooks/useSearchKeyword'
import Description from '../Description'
import PaperCardContainer from '../PaperCardContainer'
import SearchBox from '../SearchBox'
import Title from '../Title'
import {
    StyledRootContainer,
    StyledContent,
    StyledLogoutIcon,
    StyledLogoutIconButton,
} from './HomeStyles'
import { useLocalStorage } from '@uidotdev/usehooks'

const Home = () => {
    const { handleSearch, keyword, enabled } = useSearchKeyword()
    const [, setToken] = useLocalStorage('token')

    return (
        <StyledRootContainer>
            <StyledContent>
                <StyledLogoutIconButton size="medium">
                    <StyledLogoutIcon
                        fontSize="inherit"
                        onClick={() => setToken('')}
                    />
                </StyledLogoutIconButton>

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
