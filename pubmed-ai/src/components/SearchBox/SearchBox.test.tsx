import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import SearchBox from './SearchBox'

describe('SearchBox: Test that component', () => {
    it('should initially render correctly', () => {
        render(<SearchBox handleSearch={jest.fn()} isSearchDisabled={false} />)

        expect(screen.getByTestId('input-search')).toBeInTheDocument()
        expect(screen.getByTestId('search-button')).toBeInTheDocument()
        expect(screen.getByTestId('search-button')).toHaveAttribute('disabled')
    })

    it('should call handleSearch with correct search value', () => {
        const handleSearch = jest.fn()
        render(
            <SearchBox handleSearch={handleSearch} isSearchDisabled={false} />
        )

        fireEvent.change(screen.getByPlaceholderText('Try `Paracetamol`...'), {
            target: { value: 'Paracetamol' },
        })

        fireEvent.click(screen.getByTestId('search-button'))
        expect(handleSearch).toHaveBeenCalledWith('Paracetamol')
    })
})
