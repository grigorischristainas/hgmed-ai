import { Button, styled } from '@mui/material'

export const StyledRootContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
})

export const StyledMoreButton = styled(Button)({
    backgroundColor: '#ffffff',
    color: '#444444',
    '&:hover': {
        backgroundColor: '#f6f6f6',
    },
})
