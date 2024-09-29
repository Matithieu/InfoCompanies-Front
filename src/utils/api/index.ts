import { AutoCompleteType } from '../../data/types/common'
import { CheckStatus, Company } from '../../data/types/company'
import { CompanySeen } from '../../data/types/company-seen'
import { Page } from '../../data/types/companyDetails'
import { User } from '../../data/types/user'
import { asserts, isNotNU } from '../assertion.util'
import { parseJsonToCompany, parseJsonToUser } from '../parseJsonToObject'
import { fetchWithConfig } from './config'
import handleStatusError from './errors/handleStatusError'

export const fetchUser = async () => {
  const response = await fetchWithConfig('/v1/user', 'GET')

  if (response.ok) {
    return parseJsonToUser(await response.json())
  }

  throw new Error(await handleStatusError(response, 'Error fetching user'))
}

export const updateUserOnboarding = async () => {
  const response = await fetchWithConfig('/v1/completeOnboarding', 'POST')

  if (response.ok) {
    return
  }

  throw new Error(
    await handleStatusError(response, 'Error updating user onboarding'),
  )
}

export const fetchTest = async () => {
  const response = await fetchWithConfig('/v1/company/test', 'GET')

  if (response.ok) {
    return response.toString()
  }

  return null
}

export async function fetchCompaniesWithUrlAndPage(url: string, page: number) {
  const response = await fetchWithConfig(
    `/v1/company/${url}page=${page}`,
    'GET',
  )

  if (response.ok) {
    const data: Page<Company> = await response.json()
    const parsedCompanies = data.content.map((company) =>
      parseJsonToCompany(company),
    )
    asserts(parsedCompanies.every(isNotNU), 'Some companies are undefined')

    data.content = parsedCompanies
    return data
  }

  throw new Error(
    await handleStatusError(response, `/v1/company/${url}page=${page}`),
  )
}

export async function fetchCompanyBySearchTerm(
  searchTerm: string,
  page: number,
) {
  const response = await fetchWithConfig(
    `/v1/company/search-by-name?companyName=${searchTerm}&page=${page}`,
    'GET',
  )

  if (response.ok) {
    const data: Page<Company> = await response.json()
    const parsedCompanies = data.content.map((company) =>
      parseJsonToCompany(company),
    )
    asserts(parsedCompanies.every(isNotNU), 'Some companies are undefined')

    data.content = parsedCompanies
    return data
  }

  throw new Error(
    await handleStatusError(response, 'Error fetching company by search term'),
  )
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

  throw new Error(
    await handleStatusError(
      response,
      `Error fetching autocomplete for ${autoComplete}`,
    ),
  )
}

export async function fetchCompanyById(id: string) {
  const response = await fetchWithConfig(`/v1/company/get-by-id/${id}`, 'GET')

  if (response.ok) {
    const data = parseJsonToCompany(await response.json())
    asserts(isNotNU(data), 'Company is undefined')

    return data
  }

  throw new Error(
    await handleStatusError(response, `Error fetching company by id ${id}`),
  )
}

export async function fetchCompanyByIds(ids: number[], page: number) {
  const response = await fetchWithConfig(
    `/v1/company/get-by-ids?ids=${ids.join(',')}&page=${page}`,
    'GET',
  )

  if (response.ok) {
    const data: Page<Company> = await response.json()
    const parsedCompanies = data.content.map((company) =>
      parseJsonToCompany(company),
    )
    asserts(parsedCompanies.every(isNotNU), 'Some companies are undefined')

    data.content = parsedCompanies
    return data
  }

  throw new Error(
    await handleStatusError(response, `Error fetching company by ids`),
  )
}

export async function fetchCompanyScrap(companyId: number) {
  const response = await fetchWithConfig(
    `/v1/company/scrap?companyId=${companyId}`,
    'GET',
  )

  if (response.ok) {
    return parseJsonToCompany(await response.json())
  }

  throw new Error(
    await handleStatusError(response, `Error fetching company scrap`),
  )
}

export async function fetchCompanySeen() {
  const response = await fetchWithConfig(`/v1/companies-status/`, 'GET')

  if (response.ok) {
    return (await response.json()) as CompanySeen[]
  }

  throw new Error(
    await handleStatusError(response, `Error fetching company seen`),
  )
}

export async function fetchFavorites(page: number) {
  const response = await fetchWithConfig(
    `/v1/company/get-seen-by-user?page=${page}
    `,
    'GET',
  )

  if (response.ok) {
    const data: Page<Company> = await response.json()
    const parsedCompanies = data.content.map((company) =>
      parseJsonToCompany(company),
    )
    asserts(parsedCompanies.every(isNotNU), 'Some companies are undefined')

    data.content = parsedCompanies
    return data
  }

  throw new Error(await handleStatusError(response, `Error fetching favorites`))
}

export async function updateUser(user: User) {
  const response = await fetchWithConfig('/v1/update-user', 'PUT', {
    body: user,
  })

  if (response.ok) {
    return
  }

  throw new Error(await handleStatusError(response, `Error updating user`))
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

  throw new Error(
    await handleStatusError(response, `Error updating seen company`),
  )
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

  // ToDo handle error
  // handleStatusError(response, '/v1/stripe/subscriptions/trial')
  return null
}
