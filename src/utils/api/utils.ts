import { Company, CompanyWithStatus } from '../../data/types/company'
import { Leader, Page } from '../../data/types/index.types'
import { SearchParams } from '../../stores/filtersStore'
import { isNotNU } from '../assertion.util'
import {
  parseJsonToCompany,
  parseJsonToUserCompanyStatus,
} from '../parseJsonToObject.util'

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
): string => {
  const urlParts: string[] = [baseUrl]

  const appendQuery = (key: string, value: string | string[]) => {
    if (Array.isArray(value) && value.length > 0) {
      urlParts.push(`${key}=${value.join(',')}&`)
    } else if (value) {
      urlParts.push(`${key}=${value}&`)
    }
  }

  appendQuery('regions', searchParams.region)
  appendQuery(
    'cities',
    searchParams.city.map((city) => city.name),
  )
  appendQuery(
    'industrySectors',
    searchParams.industrySector.map((sector) => sector.name),
  )
  appendQuery(
    'legalForms',
    searchParams.legalForm.map((form) => form.name),
  )

  if (
    searchParams.employee &&
    isNotNU(searchParams.employee.amount) &&
    isNotNU(searchParams.employee.comparator)
  ) {
    urlParts.push(`numberOfEmployee=${searchParams.employee.amount}&`)
    urlParts.push(`comparator=${searchParams.employee.comparator}&`)
  }

  appendQuery('socials', searchParams.socials)
  appendQuery('contacts', searchParams.contact)

  if (searchParams.isCompanySeen) {
    urlParts.push(`isCompanySeen=${searchParams.isCompanySeen}&`)
  }

  return urlParts.join('')
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
