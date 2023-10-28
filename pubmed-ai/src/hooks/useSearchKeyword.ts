import React from 'react'
import { SearchBoxProps } from '../components/SearchBox/types'

export type UseSearchKeywordReturn = {
    searchKeyword: string
    handleSearch: SearchBoxProps['handleSearch']
}

const useSearchKeyword = (): UseSearchKeywordReturn => {
    const [searchKeyword, setSearchKeyword] = React.useState('')

    const handleSearch = React.useCallback<SearchBoxProps['handleSearch']>(
        (keyword) => {
            setSearchKeyword(keyword)
        },
        []
    )

    return { searchKeyword, handleSearch }
}

export default useSearchKeyword
