import { PubMedResult } from '../../../lib/types'

const getResultChunks = (pubMedResults: PubMedResult[], chunkSize: number) => {
    return pubMedResults.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / chunkSize)

        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }

        resultArray[chunkIndex].push(item)

        return resultArray
    }, [] as PubMedResult[][])
}

export default getResultChunks
