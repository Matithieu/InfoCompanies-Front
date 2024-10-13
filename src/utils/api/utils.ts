import { Company, CompanyWithStatus } from '../../data/types/company'
import { Leader, Page } from '../../data/types/index.types'
import { SearchParams } from '../../store/filtersStore'
import { isNotNU } from '../assertion.util'
import {
  parseJsonToCompany,
  parseJsonToUserCompanyStatus,
} from '../parseJsonToObject'

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

  if (searchParams.socials.length > 0) {
    url += `socials=${searchParams.socials.join(',')}&`
  }

  if (searchParams.contact.length > 0) {
    url += `contacts=${searchParams.contact.join(',')}&`
  }

  if (searchParams.isCompanySeen) {
    url += `isCompanySeen=${searchParams.isCompanySeen}&`
  }

  return url
}

export const parseAndConertCompanyWithStatus = (
  companyWithStatus: CompanyWithStatus,
) => {
  const userCompanyStatusData = parseJsonToUserCompanyStatus(
    companyWithStatus.userCompanyStatus,
  )
  return parseJsonToCompany(companyWithStatus.company, userCompanyStatusData)
}

export const parseAndConvertPageCompaniesWithStatus = (
  data: Page<CompanyWithStatus>,
) => {
  const parsedCompanies = data.content.map(({ company, userCompanyStatus }) => {
    return parseAndConertCompanyWithStatus({ company, userCompanyStatus })
  })

  const pageCompany: Page<Company> = {
    ...data,
    content: parsedCompanies,
  }

  return pageCompany
}
