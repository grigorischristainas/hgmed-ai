import {
    StyledRootContainer,
    StyledButton,
    StyledTitle,
    StyledDescription,
    StyledAvatar,
    StyledContentContainer,
    StyledButtonContainer,
    StyledLinkContainer,
} from './LoginStyles'
import * as React from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import loginUser from '../../services/loginUser'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { useLocalStorage } from '@uidotdev/usehooks'
import { Link } from '@mui/material'

const Login = () => {
    const [emailError, setEmailError] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState(false)
    const [openSnackbar, setOpenSnackbar] = React.useState(false)
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] =
        React.useState(false)
    const [isLoginLoading, setIsLoginLoading] = React.useState(false)

    const [, saveToken] = useLocalStorage<string | undefined>(
        'token',
        undefined
    )

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitButtonDisabled(true)

        const data = new FormData(event.currentTarget)
        const email = data.get('email')
        const password = data.get('password')

        if (!email) {
            setEmailError(true)
        }

        if (!password) {
            setPasswordError(true)
        }

        if (email && password) {
            try {
                setIsLoginLoading(true)

                const response = await loginUser(
                    email.toString(),
                    password.toString()
                )

                setIsLoginLoading(false)
                saveToken(response.accessToken)
            } catch (error) {
                setOpenSnackbar(true)
            }
        }
        setIsLoginLoading(false)
        setIsSubmitButtonDisabled(false)
    }

    const handleSnackbarClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return
        }

        setOpenSnackbar(false)
    }

    return (
        <StyledRootContainer>
            <Container component="main" maxWidth="xs">
                <StyledContentContainer>
                    <StyledAvatar>
                        <LoginOutlinedIcon />
                    </StyledAvatar>
                    <StyledTitle variant="h3" gutterBottom>
                        Welcome back!
                    </StyledTitle>
                    <StyledDescription variant="subtitle1" align="center">
                        To keep connected with us please login using your
                        personal information
                    </StyledDescription>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                            error={emailError}
                            onChange={() => setEmailError(false)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            error={passwordError}
                            onChange={() => setPasswordError(false)}
                        />
                        <StyledLinkContainer>
                            <Link href="/signup" variant="body2">
                                Don't have an account? Sign up
                            </Link>
                        </StyledLinkContainer>
                        <StyledButtonContainer>
                            <StyledButton
                                type="submit"
                                variant="contained"
                                loading={isLoginLoading}
                                disabled={isSubmitButtonDisabled}
                            >
                                Sign In
                            </StyledButton>
                        </StyledButtonContainer>
                    </Box>
                </StyledContentContainer>
            </Container>
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    Incorrect email or password. Please try again.
                </Alert>
            </Snackbar>
        </StyledRootContainer>
    )
}

export default Login
