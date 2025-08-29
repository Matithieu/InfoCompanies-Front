import { ColumnsDefinition } from '@/types/columns/columns.type'
import { CompanyDTO } from '@/types/index.types'
import { Key } from 'react'

import { remplaceBackSlashInDate } from '../../../utils/date.util'

export const isDateLessThanOneDay = (date: string): boolean => {
  if (date === null) return false

  const lastScrapingDate = new Date(remplaceBackSlashInDate(date))
  const now = new Date()

  // If the last scraping date is less than 24 hours ago, we don't scrap
  const isLessThanOneDay =
    lastScrapingDate !== null &&
    now.getTime() - lastScrapingDate.getTime() <= 24 * 60 * 60 * 1000 // Include 24-hour boundary

  return isLessThanOneDay
}

export const canBeScrapped = (
  company: CompanyDTO,
  data: CompanyDTO | undefined,
  isError: boolean,
  isFetching: boolean,
): boolean => {
  const scrapingDateExists =
    company.scrapingDate !== null && company.scrapingDate !== undefined

  const isLessThanOneDay = isDateLessThanOneDay(company.scrapingDate)

  const hasPhoneNumber = company.contact?.phoneNumber !== null

  const doScrap =
    !data &&
    !isError &&
    !isFetching &&
    !hasPhoneNumber &&
    (!scrapingDateExists || !isLessThanOneDay)

  return doScrap
}

export function countLeafColumns<TId extends Key, FSubId extends Key, TRow>(
  col: ColumnsDefinition<TId, FSubId, TRow>[number],
): number {
  if (!Array.isArray(col.children) || col.children.length === 0) return 1
  return col.children.reduce((sum, child) => sum + countLeafColumns(child), 0)
}

export function getMaxDepth<TId extends Key, FSubId extends Key, TRow>(
  columns: ColumnsDefinition<TId, FSubId, TRow>,
): number {
  let max = 0

  for (const col of columns) {
    if (Array.isArray(col.children) && col.children.length > 0) {
      max = Math.max(max, getMaxDepth(col.children) + 1)
    } else {
      max = Math.max(max, 1)
    }
  }

  return max
}
