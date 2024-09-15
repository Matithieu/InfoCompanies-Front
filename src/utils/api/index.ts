import { AutoCompleteType } from '../../data/types/common'
import { CheckStatus, Company } from '../../data/types/company'
import { CompanySeen } from '../../data/types/company-seen'
import { Page } from '../../data/types/companyDetails'
import { User } from '../../data/types/user'
import { asserts, isNotNU } from '../assertion.util'
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

  if (response.status === 425) {
    throw new Error('Wait 1 one day before fetching companies again')
  }

  if (response) {
    const data: Page<Company> = await response.json()
    const parsedCompanies = data.content.map((company) =>
      parseJsonToCompany(company),
    )
    asserts(parsedCompanies.every(isNotNU), 'Some companies are undefined')

    data.content = parsedCompanies
    return data
  }

  throw new Error('Failed to fetch companies with url and page')
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
    const parsedCompanies = data.content.map((company) =>
      parseJsonToCompany(company),
    )
    asserts(parsedCompanies.every(isNotNU), 'Some companies are undefined')

    data.content = parsedCompanies
    return data
  }

  throw new Error('Failed to fetch companies by search term')
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
    asserts(isNotNU(data), 'Company is undefined')

    return data
  }

  throw new Error('Failed to fetch company by id')
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

    data.content = parsedCompanies
    return data
  }

  throw new Error('Failed to fetch companies by ids')
}

export async function fetchCompanyScrap(companyId: number) {
  const response = await fetchWithConfig(
    `/v1/company/scrap?companyId=${companyId}`,
    'GET',
  )

  if (response) {
    return parseJsonToCompany(await response.json())
  }

  throw new Error('Failed to fetch company scrap')
}

export async function fetchCompanySeen() {
  const response = await fetchWithConfig(`/v1/companies-status/`, 'GET')

  if (response) {
    return (await response.json()) as CompanySeen[]
  }

  throw new Error('Failed to fetch company seen')
}

export async function fetchFavorites(page: number) {
  const response = await fetchWithConfig(
    `/v1/company/get-seen-by-user?page=${page}
    `,
    'GET',
  )

  if (response) {
    const data: Page<Company> = await response.json()
    const parsedCompanies = data.content.map((company) =>
      parseJsonToCompany(company),
    )
    asserts(parsedCompanies.every(isNotNU), 'Some companies are undefined')

    data.content = parsedCompanies
    return data
  }

  throw new Error('Failed to fetch company seen')
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

export async function updateSeenCompany(
  companyId: number,
  status: CheckStatus,
) {
  const response = await fetchWithConfig(
    `/v1/companies-status/${companyId}`,
    'POST',
    {
      body: {
        status: status,
      },
    },
  )

  if (response.ok) {
    return
  }

  throw new Error('Failed to update seen company')
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
