import { Company } from '../../../data/types/company'
import { remplaceBackSlashInDate } from '../../../utils/date.util'

export const canBeScrapped = (
  company: Company,
  data: any,
  isError: boolean,
  isFetching: boolean,
): boolean => {
  const scrapingDateExists =
    company.scrapingDate !== null && company.scrapingDate !== undefined

  const lastScrapingDate = scrapingDateExists
    ? new Date(remplaceBackSlashInDate(company.scrapingDate))
    : null
  const now = new Date()

  // If the last scraping date is less than 24 hours ago, we don't scrap
  const isLessThanOneDay =
    lastScrapingDate !== null &&
    now.getTime() - lastScrapingDate.getTime() < 24 * 60 * 60 * 1000 // 24 hours

  const doScrap =
    !data &&
    !isError &&
    !isFetching &&
    (!scrapingDateExists || !isLessThanOneDay)

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
