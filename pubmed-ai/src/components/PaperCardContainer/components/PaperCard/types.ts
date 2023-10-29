export type PaperSummary = {
    intervention: string
    disease: string
    effectiveness: string
}

export type PaperCardProps = {
    id: number
    title: string
    abstract: string
    summary: PaperSummary
}
