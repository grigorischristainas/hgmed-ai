import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
    StyledButton,
    StyledRootContainer,
    StyledDescription,
    StyledPageNotFoundTitle,
    StyledTitle,
} from './VerifyStyles'
import NotFound from '../../assets/notFound.png'
import VerificationSuccess from '../../assets/verificationSuccess.png'
import useEmailVerify from './hooks/useEmailVerify'
import { CircularProgress } from '@mui/material'

const Verify = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const token = searchParams.get('token') || ''

    const { isPending, isError } = useEmailVerify({
        token,
        enabled: token !== null,
    })

    if (!token || isError) {
        return (
            <StyledRootContainer>
                <img src={NotFound} alt="notfound" width="260px" />
                <StyledPageNotFoundTitle variant="h4">
                    Page not found
                </StyledPageNotFoundTitle>
                <StyledDescription variant="subtitle1" align="center">
                    We are sorry, the page you requested can not be found.
                </StyledDescription>
                <Link to="/">
                    <StyledButton variant="contained" data-testid="home-button">
                        Go Home
                    </StyledButton>
                </Link>
            </StyledRootContainer>
        )
    }

    if (isPending) {
        return (
            <StyledRootContainer>
                <CircularProgress size={35} />
            </StyledRootContainer>
        )
    }

    return (
        <StyledRootContainer>
            <img src={VerificationSuccess} alt="success" width="200px" />
            <StyledTitle variant="h4">Thank you</StyledTitle>
            <StyledDescription variant="subtitle1" align="center">
                Your email address has been successfully verified and you can
                now login using your personal information
            </StyledDescription>
            <Link to="/login">
                <StyledButton variant="contained" data-testid="home-button">
                    Login
                </StyledButton>
            </Link>
        </StyledRootContainer>
    )
}

export default Verify
