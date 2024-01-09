import EmailSent from '../../../../assets/mailSent.png'
import {
    StyledDescription,
    StyledRootContainer,
    StyledTitle,
} from './RegistrationSuccessStyles'

const RegistrationSuccess = () => {
    return (
        <StyledRootContainer>
            <img src={EmailSent} alt="notfound" width="200px" />
            <StyledTitle variant="h4">Almost there</StyledTitle>
            <StyledDescription variant="subtitle1" align="center">
                An email has been sent to verify your email address. Please
                follow the instructions to complete your registration and login.
            </StyledDescription>
        </StyledRootContainer>
    )
}

export default RegistrationSuccess
