import React from 'react'

export type UseScrollToEndOfCardsReturn = {
    endOfCardsRef: React.RefObject<HTMLDivElement>
}

export type UseScrollToEndOfCardsProps = {
    renderedResultsLength: number
}

const useScrollToEndOfCards = ({
    renderedResultsLength,
}: UseScrollToEndOfCardsProps): UseScrollToEndOfCardsReturn => {
    const endOfCardsRef = React.useRef<null | HTMLDivElement>(null)

    const scrollToBottom = () => {
        endOfCardsRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    React.useEffect(() => {
        scrollToBottom()
    }, [renderedResultsLength])

    return { endOfCardsRef }
}

export default useScrollToEndOfCards
