import React from 'react'
import { SearchBoxProps } from '../components/SearchBox/types'

export type UseSearchKeywordReturn = {
    handleSearch: SearchBoxProps['handleSearch']
    keyword: string
    enabled: boolean
}
const useSearchKeyword = (): UseSearchKeywordReturn => {
    const [enabled, setIsEnabled] = React.useState(false)
    const [keyword, setKeyword] = React.useState('')

    const handleSearch = React.useCallback<SearchBoxProps['handleSearch']>(
        (keyword) => {
            setKeyword(keyword)
            setIsEnabled(true)
        },
        []
    )

    return { handleSearch, keyword, enabled }
}

export default useSearchKeyword
