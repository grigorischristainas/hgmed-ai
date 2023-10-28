import React from 'react'
import { PaperCardContainerProps } from './types'

const PaperCardContainer = ({ keyword }: PaperCardContainerProps) => {
    return <div>Search results for {keyword}</div>
}

export default React.memo(PaperCardContainer)
