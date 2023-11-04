import {
    StyledButtonContainer,
    StyledRootContainer,
    StyledTryAgainButton,
} from './ErrorContentStyles'
import RefreshIcon from '@mui/icons-material/Refresh'
import { ErrorContentProps } from './types'

const ErrorContent = ({ handleRefetch }: ErrorContentProps) => {
    return (
        <StyledRootContainer>
            <div>There was an error receiving the AI generated summary.</div>
            <StyledButtonContainer style={{}}>
                <StyledTryAgainButton
                    variant="text"
                    fullWidth={false}
                    startIcon={<RefreshIcon />}
                    onClick={handleRefetch}
                >
                    Try again
                </StyledTryAgainButton>
            </StyledButtonContainer>
        </StyledRootContainer>
    )
}

export default ErrorContent
