import React from 'react'

export type UseDialogReturn = {
    dialogOpen: boolean
    handleDialogClose: () => void
    handleInfoIconClick: () => void
}

const useDialog = (): UseDialogReturn => {
    const [dialogOpen, setDialogOpen] = React.useState(false)
    const handleDialogClose = React.useCallback(() => {
        setDialogOpen(false)
    }, [])

    const handleInfoIconClick = React.useCallback(() => {
        setDialogOpen(true)
    }, [])

    return { dialogOpen, handleDialogClose, handleInfoIconClick }
}

export default useDialog
