import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App: Test that component', () => {
    it('should initially render correctly', () => {
        render(<App />)

        expect(
            screen.getByText('Your personal AI PubMed Assistant')
        ).toBeInTheDocument()
        expect(screen.getByTestId('input-search')).toBeInTheDocument()
        expect(screen.getByTestId('search-button')).toBeInTheDocument()
    })
})
