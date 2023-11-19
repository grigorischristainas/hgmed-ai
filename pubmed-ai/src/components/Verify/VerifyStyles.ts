import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

export const StyledRootContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    gap: 20,
})

export const StyledPageNotFoundTitle = styled(Typography)({
    fontWeight: 600,
})

export const StyledButton = styled(Button)({
    backgroundColor: '#444444',
    '&:hover': {
        backgroundColor: '#29171b',
    },
})

export const StyledDescription = styled(Typography)({
    maxWidth: 500,
    color: '#929292',
    textAlign: 'center',
})

export const StyledTitle = styled(Typography)({
    fontWeight: 600,
})
