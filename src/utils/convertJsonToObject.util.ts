// https://github.com/typestack/class-transformer
// use this library to transform json to class ??

import { CompanyDTO, Reviews, Schedule } from '@/types/index.types'

import { isNotNU } from './assertion.util'

export const convertJsonToSchedule = (company: CompanyDTO) => {
  try {
    if (!isNotNU(company.schedule)) return null
    return company.schedule as unknown as Schedule
  } catch (error) {
    throw new Error(
      'Error converting schedule JSON to schedule object: ' + error,
    )
  }
}

export function convertJsonToReviews(company: CompanyDTO) {
  try {
    if (!isNotNU(company)) return null
    return company.reviews as unknown as Reviews
  } catch (e) {
    throw new Error('Error converting reviews JSON to reviews object: ' + e)
  }
}
