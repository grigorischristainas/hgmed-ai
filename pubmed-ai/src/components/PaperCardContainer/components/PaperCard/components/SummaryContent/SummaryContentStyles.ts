import { styled } from '@mui/material'
import CoronavirusIcon from '@mui/icons-material/Coronavirus'
import MedicationIcon from '@mui/icons-material/Medication'
import LightbulbIcon from '@mui/icons-material/Lightbulb'

export const StyledDiseaseIcon = styled(CoronavirusIcon)({
    color: '#4c7a34',
})

export const StyledInterventionIcon = styled(MedicationIcon)({
    color: '#6334e3',
})

export const StyledEffectivenessIcon = styled(LightbulbIcon)({
    color: '#c3bb38',
})

export const StyledSkeletonIconContainer = styled('div')({
    display: 'inline-block',
    width: '1em',
    height: '1em',
})

export const StyledSectionContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
})
