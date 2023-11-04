import { Typography, styled } from '@mui/material'
import Card from '@mui/material/Card'
import InfoIcon from '@mui/icons-material/Info'

export const StyledCard = styled(Card)({
    width: '100%',
    maxWidth: '800px',
    minHeight: '200px',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;',
})

export const StyledSectionContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
})

export const StyledTitle = styled(Typography)({
    fontSize: 15,
    fontWeight: 800,
    lineHeight: 1.3,
    fontFamily: '',
})

export const StyledContentContainer = styled('div')({
    display: 'flex',
})

export const StyledSummaryContainer = styled('div')({
    padding: 20,
    display: 'flex',
    gap: 10,
    flexDirection: 'column',
    flexGrow: 1,
})

export const StyledInfoIconContainer = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'end',
    marginLeft: 'auto',
})

export const StyledInfoIcon = styled(InfoIcon)({
    color: '#444444',
    width: 20,
    '&:hover': {
        cursor: 'pointer',
    },
})
