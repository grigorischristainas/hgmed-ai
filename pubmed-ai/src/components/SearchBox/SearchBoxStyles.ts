import { styled, inputBaseClasses } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export const StyledRootContainer = styled('div')({
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'column',
})

export const StyledTextField = styled(TextField)({
    maxWidth: 600,
    width: '100%',
    flexGrow: 1,
    [`& .${inputBaseClasses.root}`]: {
        borderRadius: 26,
    },
})

export const StyledButtonContainer = styled('div')({
    marginTop: 20,
})

export const StyledButton = styled(Button)({
    backgroundColor: '#444444',
    '&:hover': {
        backgroundColor: '#29171b',
    },
})
