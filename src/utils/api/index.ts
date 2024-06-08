import { Company } from '../../data/types/company'
import { CompanyDetails, Page } from '../../data/types/companyDetails'
import { User } from '../../data/types/user'
import { parseJsonToCompany, parseJsonToUser } from '../parseJsonToObject'
import { fetchWithConfig } from './config'

export const fetchUser = async () => {
  const response = await fetchWithConfig('/api/v1/user', 'GET')

  if (response) {
    return parseJsonToUser(await response.json())
  }

  return null
}

export const fetchTest = async () => {
  const response = await fetchWithConfig('api/v1/company/test', 'GET')

  if (response) {
    return response.toString()
  }

  return null
}

export async function fetchCompaniesWithUrlAndPage(url: string, page: number) {
  const response = await fetchWithConfig(
    `/api/v1/company/${url}page=${page}`,
    'GET',
  )

  if (response) {
    const data: Page<Company> = await response.json()
    return data
  }

  return null
}

export async function fetchCompanyBySearchTerm(
  searchTerm: string,
  page: number,
) {
  const response = await fetchWithConfig(
    `/api/v1/company/search-by-name?companyName=${searchTerm}&page=${page}`,
    'GET',
  )

  if (response) {
    const data: Page<CompanyDetails> = await response.json()
    return data
  }

  return null
}

export async function fetchCompnayById(id: string) {
  const response = await fetchWithConfig(
    `/api/v1/company/get-by-id/${id}`,
    'GET',
  )

  if (response) {
    return parseJsonToCompany(await response.json())
  }

  return null
}

export async function fetchCompanyScrap(companyId: number) {
  const response = await fetchWithConfig(
    `/api/v1/company/scrap?companyId=${companyId}`,
    'GET',
  )

  if (response) {
    return parseJsonToCompany(await response.json())
  }

  return null
}

export async function updateUser(user: User) {
  const response = await fetchWithConfig('/api/v1/update-user', 'PUT', {
    body: user,
  })

  if (response.ok) {
    return
  }

  return null
}
