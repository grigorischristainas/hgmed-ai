import useSearchKeyword from '../../hooks/useSearchKeyword'
import Description from '../Description'
import PaperCardContainer from '../PaperCardContainer'
import SearchBox from '../SearchBox'
import Title from '../Title'
import {
    StyledRootContainer,
    StyledContent,
    StyledLogoutIcon,
    StyledMainContentContainer,
    StyledLogoutIconButtonContainer,
} from './HomeStyles'
import { useLocalStorage } from '@uidotdev/usehooks'
import IconButton from '@mui/material/IconButton'

const Home = () => {
    const { handleSearch, keyword, enabled } = useSearchKeyword()
    const [, setToken] = useLocalStorage('token')

    return (
        <StyledRootContainer>
            <StyledLogoutIconButtonContainer>
                <IconButton size="medium">
                    <StyledLogoutIcon
                        fontSize="inherit"
                        onClick={() => setToken(undefined)}
                    />
                </IconButton>
            </StyledLogoutIconButtonContainer>
            <StyledMainContentContainer>
                <StyledContent>
                    <Title />
                    <Description />
                    <SearchBox
                        handleSearch={handleSearch}
                        isSearchDisabled={false}
                    />
                    {enabled && <PaperCardContainer keyword={keyword} />}
                </StyledContent>
            </StyledMainContentContainer>
        </StyledRootContainer>
    )
}

export default Home
