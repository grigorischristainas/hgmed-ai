import React from 'react'
import { SearchBoxProps } from '../components/SearchBox/types'
import usePubMedResults from './usePubMedResults'

export type UseSearchKeywordReturn = {
    handleSearch: SearchBoxProps['handleSearch']
} & Pick<ReturnType<typeof usePubMedResults>, 'data' | 'isLoading' | 'isError'>

const useSearchKeyword = (): UseSearchKeywordReturn => {
    const [enabled, setIsEnabled] = React.useState(false)
    const [keyword, setKeyword] = React.useState('')

    const { isLoading, data, isError } = usePubMedResults({ keyword, enabled })

    const handleSearch = React.useCallback<SearchBoxProps['handleSearch']>(
        (keyword) => {
            setKeyword(keyword)
            setIsEnabled(true)
        },
        []
    )

    return { handleSearch, isLoading, data, isError }
}

export default useSearchKeyword
