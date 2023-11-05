import {
    StyledRootContainer,
    StyledButton,
    StyledTitle,
    StyledDescription,
    StyledAvatar,
    StyledContentContainer,
    StyledButtonContainer,
} from './LoginStyles'
import * as React from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'

const Login = () => {
    const [emailError, setEmailError] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState(false)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const email = data.get('email')
        const password = data.get('password')

        if (!email) {
            setEmailError(true)
        }

        if (!password) {
            setPasswordError(true)
        }

        console.log({
            email: email,
            password: password,
        })
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
                            autoComplete="email"
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
                            autoComplete="current-password"
                            error={passwordError}
                            onChange={() => setPasswordError(false)}
                        />
                        <StyledButtonContainer>
                            <StyledButton type="submit" variant="contained">
                                Sign In
                            </StyledButton>
                        </StyledButtonContainer>
                    </Box>
                </StyledContentContainer>
            </Container>
        </StyledRootContainer>
    )
}

export default Login
