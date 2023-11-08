import { styled } from '@mui/material'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import IconButton from '@mui/material/IconButton'

export const StyledRootContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    gap: 10,
})

export const StyledContent = styled('div')({
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

export const StyledLogoutIcon = styled(LogoutRoundedIcon)({
    color: '#e45a89',
})

export const StyledLogoutIconButton = styled(IconButton)({
    position: 'absolute',
    top: 20,
    right: 20,
})
