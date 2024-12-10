import { Company } from '../../../data/types/company'
import { remplaceBackSlashInDate } from '../../../utils/date.util'

export const canBeScrapped = (
  company: Company,
  data: Company | undefined,
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

  const hasPhoneNumber = company.phoneNumber !== null

  const doScrap =
    !data &&
    !isError &&
    !isFetching &&
    !hasPhoneNumber &&
    (!scrapingDateExists || !isLessThanOneDay)

  return doScrap
}
