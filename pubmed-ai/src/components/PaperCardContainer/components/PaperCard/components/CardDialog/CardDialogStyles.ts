import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

export const StyledContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: 30,
})

export const StyledDialogContentContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
})

export const StyledTitle = styled(Typography)({
    fontSize: 15,
    fontWeight: 800,
    lineHeight: 1.3,
    fontFamily: '',
})

export const StyledButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
})

export const StyledButton = styled(Button)({
    backgroundColor: '#444444',
    '&:hover': {
        backgroundColor: '#29171b',
    },
})

export const StyledCloseButton = styled(Button)({
    backgroundColor: '#ffffff',
    color: '#444444',
    '&:hover': {
        backgroundColor: '#f6f6f6',
    },
})
