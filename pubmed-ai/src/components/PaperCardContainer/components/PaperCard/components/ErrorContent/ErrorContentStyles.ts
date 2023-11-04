import { Button, styled } from '@mui/material'

export const StyledRootContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
})

export const StyledButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
})

export const StyledTryAgainButton = styled(Button)({
    backgroundColor: '#ffffff',
    color: '#444444',
    '&:hover': {
        backgroundColor: '#f6f6f6',
    },
})
