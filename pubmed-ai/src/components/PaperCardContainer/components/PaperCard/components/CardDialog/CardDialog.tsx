import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { CardDialogProps } from './types'
import {
    StyledTitle,
    StyledDialogContentContainer,
    StyledButton,
    StyledContainer,
    StyledButtonContainer,
    StyledCloseButton,
} from './CardDialogStyles'

const CardDialog = ({
    open,
    handleClose,
    titleContent,
    abstract,
}: CardDialogProps) => {
    return (
        <Dialog open={open} maxWidth="md" fullWidth onClose={handleClose}>
            <DialogTitle>{titleContent}</DialogTitle>
            <DialogContent dividers>
                <StyledContainer>
                    <StyledDialogContentContainer>
                        <StyledTitle>Authors</StyledTitle>
                        <div>lorem ipsum</div>
                        <StyledTitle>Publication Date</StyledTitle>
                        <div>lorem ipsum</div>
                        <StyledTitle>Abstract</StyledTitle>
                        <div>{abstract}</div>
                    </StyledDialogContentContainer>
                    <StyledButtonContainer>
                        <StyledCloseButton
                            variant="contained"
                            data-testid="dialog-button-go-to-pubmed"
                            onClick={handleClose}
                        >
                            Close
                        </StyledCloseButton>
                        <StyledButton
                            variant="contained"
                            data-testid="dialog-button-go-to-pubmed"
                        >
                            Go to PubMed
                        </StyledButton>
                    </StyledButtonContainer>
                </StyledContainer>
            </DialogContent>
        </Dialog>
    )
}

export default CardDialog
