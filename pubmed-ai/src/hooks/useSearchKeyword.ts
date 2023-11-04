import React from 'react'
import { SearchBoxProps } from '../components/SearchBox/types'
import usePubMedResults from '../components/PaperCardContainer/hooks/usePubMedResults'

export type UseSearchKeywordReturn = {
    handleSearch: SearchBoxProps['handleSearch']
} & Pick<ReturnType<typeof usePubMedResults>, 'data' | 'status'>

const useSearchKeyword = (): UseSearchKeywordReturn => {
    const { mutate, status, data } = usePubMedResults()

    const handleSearch = React.useCallback<SearchBoxProps['handleSearch']>(
        (keyword) => {
            mutate({ keyword })
        },
        [mutate]
    )

    return { handleSearch, status, data }
}

export default useSearchKeyword
