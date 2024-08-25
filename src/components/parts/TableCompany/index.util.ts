import { Company } from '../../../data/types/company'
import { formatDate, remplaceBackSlashInDate } from '../../../utils/date.util'

export const canBeScrapped = (
  company: Company,
  data: any,
  isError: boolean,
  isFetching: boolean,
): boolean => {
  const doScrap =
    !data &&
    !isError &&
    !isFetching &&
    (company.scrapingDate === null ||
      formatDate(remplaceBackSlashInDate(company.scrapingDate)) !== // date is is in yyyy/mm/dd format and needs to be converted to dd/mm/yyyy
        new Date().toLocaleDateString())

  return doScrap
}

// Helper function to chunk the array into smaller arrays
export const chunkArray = <T>(array: T[], chunkSize: number): T[][] => {
  return array.reduce((resultArray: T[][], item: T, index: number) => {
    const chunkIndex = Math.floor(index / chunkSize)

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // start a new chunk
    }

    resultArray[chunkIndex].push(item)
    return resultArray
  }, [])
}
