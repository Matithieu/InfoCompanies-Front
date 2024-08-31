import { Leader } from '../../data/types/leader'
import { SearchParams } from '../../store/filtersStore'
import { isNotNU } from '../assertion.util'

/**
 * Clean leaders by removing duplicates based on their first and last names
 * Remove also the empty leaders (null values on firstName or lastName)
 */
export const cleanLeaders = (leaders: Leader[]) => {
  const cleanedLeaders = leaders.filter(
    (leader, index, self) =>
      leader.firstName !== null &&
      leader.lastName !== null &&
      index ===
        self.findIndex(
          (t) =>
            t.firstName === leader.firstName && t.lastName === leader.lastName,
        ),
  )

  return cleanedLeaders
}

export const constructURLWithFilter = (
  searchParams: SearchParams,
  baseUrl: string,
) => {
  let url = baseUrl

  if (searchParams.region.length > 0) {
    url += `regions=${searchParams.region.join(',')}&`
  }

  if (searchParams.city.length > 0) {
    url += `cities=${searchParams.city.map((city) => city.name).join(',')}&`
  }

  if (searchParams.industrySector.length > 0) {
    url += `industrySectors=${searchParams.industrySector.map((sector) => sector.name).join(',')}&`
  }

  if (searchParams.legalForm.length > 0) {
    url += `legalForms=${searchParams.legalForm.map((form) => form.name).join(',')}&`
  }

  if (
    searchParams.employee &&
    isNotNU(searchParams.employee.amount) &&
    isNotNU(searchParams.employee.comparator)
  ) {
    url += `numberOfEmployee=${searchParams.employee.amount}&comparator=${searchParams.employee.comparator}&`
  }

  return url
}
