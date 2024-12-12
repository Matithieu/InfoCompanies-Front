import {
  CheckStatus,
  Company,
  CompanyWithStatus,
  UserCompanyStatus,
} from '../../data/types/company'
import { AutoCompleteType, Leader, User } from '../../data/types/index.types'
import { Page } from '../../data/types/index.types'
import { parseJsonToCompany, parseJsonToUser } from '../parseJsonToObject.util'
import { fetchThroughProxy } from './config'
import handleStatusError from './errors/handleStatusError'
import {
  cleanLeaders,
  parseAndConertCompanyWithStatus,
  parseAndConvertPageCompaniesWithStatus,
} from './utils'

/**
 *
 * User
 *
 */
export const fetchUser = async () => {
  const response = await fetchThroughProxy('/v1/user', 'GET')

  if (response.ok) {
    return parseJsonToUser(await response.json())
  }

  throw new Error(await handleStatusError(response, 'Error fetching user'))
}

/**
 *
 * Company
 *
 */
export async function fetchCompaniesWithUrlAndPage(
  url: string,
  page: number,
  userCompanyStatusParsing = true,
) {
  const response = await fetchThroughProxy(
    `/v1/company/${url}page=${page}`,
    'GET',
  )

  if (response.ok) {
    if (userCompanyStatusParsing) {
      const data: Page<CompanyWithStatus> = await response.json()
      return parseAndConvertPageCompaniesWithStatus(data)
    }

    const data: Page<Company> = await response.json()
    const userCompanyStatus: UserCompanyStatus = {
      companyId: 0,
      id: 0,
      status: CheckStatus.NOT_DONE,
      userId: '',
    }

    const parsedCompanies = data.content.map((company) =>
      parseJsonToCompany(company, userCompanyStatus),
    )

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
  const response = await fetchThroughProxy(
    `/v1/company/search-by-name?companyName=${searchTerm}&page=${page}`,
    'GET',
  )

  if (response.ok) {
    const data: Page<Company> = await response.json()
    const userCompanyStatus: UserCompanyStatus = {
      companyId: 0,
      id: 0,
      status: CheckStatus.NOT_DONE,
      userId: '',
    }

    const parsedCompanies = data.content.map((company) =>
      parseJsonToCompany(company, userCompanyStatus),
    )

    data.content = parsedCompanies
    return data
  }

  throw new Error(
    await handleStatusError(response, 'Error fetching company by search term'),
  )
}

export async function fetchCompanyById(id: string) {
  const response = await fetchThroughProxy(`/v1/company/get-by-id/${id}`, 'GET')

  if (response.ok) {
    return parseAndConertCompanyWithStatus(await response.json())
  }

  throw new Error(
    await handleStatusError(response, `Error fetching company by id ${id}`),
  )
}

export async function fetchCompanyScrap(companyId: number) {
  const response = await fetchThroughProxy(
    `/v1/company/scrap?companyId=${companyId}`,
    'GET',
  )

  if (response.ok) {
    const data: Company = await response.json()
    const userCompanyStatus: UserCompanyStatus = {
      companyId: 0,
      id: 0,
      status: CheckStatus.NOT_DONE,
      userId: '',
    }
    return parseJsonToCompany(data, userCompanyStatus)
  }

  throw new Error(
    await handleStatusError(response, `Error fetching company scrap`),
  )
}

export async function fetchFavorites(page: number) {
  const response = await fetchThroughProxy(
    `/v1/company/get-seen-by-user?page=${page}
    `,
    'GET',
  )

  if (response.ok) {
    const data: Page<CompanyWithStatus> = await response.json()
    return parseAndConvertPageCompaniesWithStatus(data)
  }

  throw new Error(await handleStatusError(response, `Error fetching favorites`))
}

export async function updateUser(user: User) {
  const response = await fetchThroughProxy('/v1/update-user', 'PUT', {
    body: user,
  })

  if (response.ok) {
    return
  }

  throw new Error(await handleStatusError(response, `Error updating user`))
}

/**
 *
 * Leader
 *
 */
export const fetchLeadersBySirens = async (siren: string) => {
  const response = await fetchThroughProxy(
    `/v1/leader/get-by-siren?siren=${siren}`,
    'GET',
  )

  if (response) {
    const leaders = (await response.json()) as Leader[]
    return cleanLeaders(leaders)
  }

  throw new Error('Failed to fetch leaders by siren')
}

export const fetchLeaderById = async (id: string) => {
  const response = await fetchThroughProxy(
    `/v1/leader/get-by-id?id=${id}}`,
    'GET',
  )

  if (response) {
    return (await response.json()) as Leader
  }

  throw new Error('Failed to fetch leader by id')
}

/**
 *
 * AutoComplete
 *
 */
export async function fetchAutoComplete(
  autoComplete: 'legal-form' | 'industry-sector' | 'city',
  searchTerm: string,
) {
  const response = await fetchThroughProxy(
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

/**
 *
 * Stripe
 *
 */
export async function startStripeSubscription(priceId: string) {
  const response = await fetchThroughProxy(
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

/**
 *
 * Test
 *
 */
export const fetchTest = async () => {
  const response = await fetchThroughProxy('/v1/company/test', 'GET')

  if (response.ok) {
    return response.toString()
  }

  return null
}
