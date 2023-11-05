import { Typography, styled } from '@mui/material'
import Card from '@mui/material/Card'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import LoopIcon from '@mui/icons-material/Loop'

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
    flexDirection: 'column',
    gap: 10,
    alignItems: 'end',
    marginLeft: 'auto',
})

export const StyledInfoIcon = styled(InfoOutlinedIcon)({
    // color: '#717a8a',
})

export const StyledRefreshIcon = styled(LoopIcon)({
    // color: '#717a8a',
})
