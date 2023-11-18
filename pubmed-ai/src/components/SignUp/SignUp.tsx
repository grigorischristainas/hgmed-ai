import {
    StyledRootContainer,
    StyledButton,
    StyledTitle,
    StyledDescription,
    StyledAvatar,
    StyledContentContainer,
    StyledButtonContainer,
    StyledLinkContainer,
} from './SignUpStyles'
import * as React from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined'
import Link from '@mui/material/Link'
import * as EmailValidator from 'email-validator'
import signupUser from '../../services/signupUser'
import { isAxiosError } from 'axios'
import RegistrationSuccess from './components/RegistrationSuccess'

const SignUp = () => {
    const [emailError, setEmailError] = React.useState(false)
    const [emailValidationError, setEmailValidationError] = React.useState('')
    const [passwordError, setPasswordError] = React.useState(false)
    const [openSnackbar, setOpenSnackbar] = React.useState(false)
    const [isSignUpLoading, setIsSignUpLoading] = React.useState(false)
    const [showRegistrationSuccess, setShowRegistrationSuccess] =
        React.useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const email = data.get('email')
        const password = data.get('password')
        let errorState = false

        if (!email || !EmailValidator.validate(email.toString())) {
            setEmailError(true)
            setEmailValidationError('Please enter a valid email address')
            errorState = true
        }

        if (!password || !(password.toString().length >= 5)) {
            setPasswordError(true)
            errorState = true
        }

        if (!errorState && email && password) {
            try {
                setIsSignUpLoading(true)

                await signupUser(email.toString(), password.toString())

                setIsSignUpLoading(false)
                setShowRegistrationSuccess(true)
            } catch (error) {
                if (isAxiosError(error)) {
                    if (error.response?.status === 422) {
                        const emailValidationError =
                            error?.response?.data?.validation.find(
                                (validation: object) => 'email' in validation
                            )

                        if (emailValidationError) {
                            setEmailError(true)
                            setEmailValidationError(
                                'This email address has already been registered'
                            )
                        }
                    }
                }

                setOpenSnackbar(true)
            }
        }

        setIsSignUpLoading(false)
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

    if (showRegistrationSuccess) {
        return <RegistrationSuccess />
    }

    return (
        <StyledRootContainer>
            <Container component="main" maxWidth="xs">
                <StyledContentContainer>
                    <StyledAvatar>
                        <AutoAwesomeOutlinedIcon />
                    </StyledAvatar>
                    <StyledTitle variant="h3" gutterBottom>
                        Welcome!
                    </StyledTitle>
                    <StyledDescription variant="subtitle1" align="center">
                        To connect with us please provide the information below
                        to create your account
                    </StyledDescription>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={emailError}
                            onChange={() => setEmailError(false)}
                            helperText={
                                emailError ? emailValidationError : undefined
                            }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={passwordError}
                            onChange={() => setPasswordError(false)}
                            helperText={
                                passwordError &&
                                'Password must be at least 5 characters long'
                            }
                        />
                        <StyledLinkContainer>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </StyledLinkContainer>
                        <StyledButtonContainer>
                            <StyledButton
                                type="submit"
                                variant="contained"
                                loading={isSignUpLoading}
                            >
                                Sign Up
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
                    There was an error submitting your registration. Please try
                    again.
                </Alert>
            </Snackbar>
        </StyledRootContainer>
    )
}

export default SignUp
