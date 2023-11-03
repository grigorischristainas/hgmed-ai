import { Search } from '@mui/icons-material'
import InputAdornment from '@mui/material/InputAdornment'
import React from 'react'
import {
    StyledRootContainer,
    StyledTextField,
    StyledButtonContainer,
    StyledButton,
} from './SearchBoxStyles'
import { SearchBoxProps } from './types'

const SearchBox = ({ handleSearch }: SearchBoxProps) => {
    const [inputText, setInputText] = React.useState<string>('')
    const [isSearchBtnDisabled, setIsSearchBtnDisabled] = React.useState(false)

    const handleInputChange = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setInputText(event.target.value)
            setIsSearchBtnDisabled(false)
        },
        []
    )

    const handleButtonClick = React.useCallback(() => {
        handleSearch(inputText)
        setIsSearchBtnDisabled(true)
    }, [inputText, handleSearch])

    // Clear results upon textbox input clear
    React.useEffect(() => {
        if (!inputText) {
            handleSearch('')
        }
    })

    return (
        <StyledRootContainer>
            <StyledTextField
                data-testid="input-search"
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                placeholder="Try `Paracetamol`..."
            />
            <StyledButtonContainer>
                <StyledButton
                    variant="contained"
                    disabled={isSearchBtnDisabled || !inputText}
                    data-testid="search-button"
                    onClick={handleButtonClick}
                >
                    Search
                </StyledButton>
            </StyledButtonContainer>
        </StyledRootContainer>
    )
}

export default React.memo(SearchBox)
