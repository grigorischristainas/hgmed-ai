import { styled } from '@mui/material'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'

export const StyledRootContainer = styled('div')({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
})

export const StyledLogoutIconButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
})

export const StyledMainContentContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
    flexGrow: 1,
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
