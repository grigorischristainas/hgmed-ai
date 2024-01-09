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
import openInNewTab from './utils/openInNewTab'

const CardDialog = ({
    open,
    handleClose,
    titleContent,
    abstract,
    authors,
    id,
    publicationDate,
}: CardDialogProps) => {
    return (
        <Dialog open={open} maxWidth="md" fullWidth onClose={handleClose}>
            <DialogTitle>{titleContent}</DialogTitle>
            <DialogContent dividers>
                <StyledContainer>
                    <StyledDialogContentContainer>
                        <StyledTitle>Authors</StyledTitle>
                        <div>{authors.join(', ')}</div>
                        <StyledTitle>Publication Date</StyledTitle>
                        <div>{publicationDate}</div>
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
                            onClick={() => openInNewTab(id)}
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
