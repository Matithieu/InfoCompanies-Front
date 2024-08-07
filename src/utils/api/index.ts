import { updateCompaniesIcon } from '../../components/common/Icons/stautIcon.util'
import { AutoCompleteType } from '../../data/types/common'
import { Company } from '../../data/types/company'
import { Page } from '../../data/types/companyDetails'
import { User } from '../../data/types/user'
import { asserts, isNotNU, NNU } from '../assertion.util'
import { parseJsonToCompany, parseJsonToUser } from '../parseJsonToObject'
import { fetchWithConfig } from './config'

export const fetchUser = async () => {
  const response = await fetchWithConfig('/v1/user', 'GET')

  if (response) {
    return parseJsonToUser(await response.json())
  }

  return null
}

export const fetchTest = async () => {
  const response = await fetchWithConfig('/v1/company/test', 'GET')

  if (response) {
    return response.toString()
  }

  return null
}

export async function fetchCompaniesWithUrlAndPage(url: string, page: number) {
  const response = await fetchWithConfig(
    `/v1/company/${url}page=${page}`,
    'GET',
  )

  if (response) {
    const data: Page<Company> = await response.json()
    const parsedCompanies = data.content.map((company) =>
      parseJsonToCompany(company),
    )
    asserts(parsedCompanies.every(isNotNU), 'Some companies are undefined')

    const updatedCompanies = updateCompaniesIcon(parsedCompanies)
    data.content = updatedCompanies

    return data
  }

  return null
}

export async function fetchCompanyBySearchTerm(
  searchTerm: string,
  page: number,
) {
  const response = await fetchWithConfig(
    `/v1/company/search-by-name?companyName=${searchTerm}&page=${page}`,
    'GET',
  )

  if (response) {
    const data: Page<Company> = await response.json()
    const updatedCompanies = updateCompaniesIcon(data.content)
    data.content = updatedCompanies

    return data
  }

  return null
}

export async function fetchAutoComplete(
  autoComplete: 'legal-form' | 'industry-sector' | 'city',
  searchTerm: string,
) {
  const response = await fetchWithConfig(
    `/v1/autocomplete/${autoComplete}?query=${searchTerm}`,
    'GET',
  )

  if (response.ok) {
    return (await response.json()) as AutoCompleteType[]
  }

  throw new Error(`Failed to fetch autocomplete ${autoComplete}`)
}

export async function fetchCompanyById(id: string) {
  const response = await fetchWithConfig(`/v1/company/get-by-id/${id}`, 'GET')

  if (response) {
    const data = parseJsonToCompany(await response.json())
    const [updatedCompanies] = updateCompaniesIcon([
      NNU(data, 'Error while fething company by id'),
    ])

    return updatedCompanies
  }

  return null
}

export async function fetchCompanyByIds(ids: number[], page: number) {
  const response = await fetchWithConfig(
    `/v1/company/get-by-ids?ids=${ids.join(',')}&page=${page}`,
    'GET',
  )

  if (response) {
    const data: Page<Company> = await response.json()
    const parsedCompanies = data.content.map((company) =>
      parseJsonToCompany(company),
    )
    asserts(parsedCompanies.every(isNotNU), 'Some companies are undefined')

    const updatedCompanies = updateCompaniesIcon(parsedCompanies)
    data.content = updatedCompanies

    return data
  }

  return null
}

export async function fetchCompanyScrap(companyId: number) {
  const response = await fetchWithConfig(
    `/v1/company/scrap?companyId=${companyId}`,
    'GET',
  )

  if (response) {
    return parseJsonToCompany(await response.json())
  }

  return null
}

export async function fetchCompanySeen() {
  const response = await fetchWithConfig(
    `/v1/company-seen/companies-seen`,
    'GET',
  )

  if (response) {
    return await response.json()
  }

  return null
}

export async function updateUser(user: User) {
  const response = await fetchWithConfig('/v1/update-user', 'PUT', {
    body: user,
  })

  if (response.ok) {
    return
  }

  return null
}

export async function updateSeenCompany(companyIds: number[]) {
  const response = await fetchWithConfig(
    '/v1/company-seen/update-company-ids',
    'POST',
    { body: companyIds },
  )

  if (response.ok) {
    return
  }

  return null
}

export async function stripeSubscription(priceId: string) {
  const response = await fetchWithConfig(
    '/v1/stripe/subscriptions/trial',
    'POST',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-priceId': priceId,
      },
    },
  )

  if (response.ok) {
    return response.text()
  }

  return null
}
