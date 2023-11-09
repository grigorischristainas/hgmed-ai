import { Avatar, Box, Typography, styled } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

export const StyledRootContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    gap: 10,
})

export const StyledButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
})

export const StyledButton = styled(LoadingButton)({
    backgroundColor: '#444444',
    '&:hover': {
        backgroundColor: '#29171b',
    },
    marginTop: 20,
    width: 200,
    height: 50,
})

export const StyledTitle = styled(Typography)({
    fontWeight: 600,
    textAlign: 'center',
})

export const StyledDescription = styled(Typography)({
    maxWidth: 500,
    color: '#929292',
    textAlign: 'center',
})

export const StyledAvatar = styled(Avatar)({
    backgroundColor: '#e45a89',
    marginBottom: 5,
})

export const StyledContentContainer = styled(Box)({
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
})
