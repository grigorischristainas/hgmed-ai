import { styled } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

export const StyledRootContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
})

export const StyledMoreButton = styled(LoadingButton)({
    backgroundColor: '#ffffff',
    color: '#444444',
    '&:hover': {
        backgroundColor: '#f6f6f6',
    },
})
