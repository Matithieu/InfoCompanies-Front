import { Company } from "../../data/types/company"
import { CompanyDetails, Page } from "../../data/types/companyDetails"
import { parseJsonToUser } from "../parseJsonToObject"
import { fetchWithConfig } from "./config"

export const fetchUser = async () => {
  try {
    const response = await fetchWithConfig("/api/v1/user", "GET")
    if (response) {
      return parseJsonToUser(response)
    }
  } catch (error) {
    throw new Error("Failed to fetch user data")
  }
  return null
}

export const fetchTest = async () => {
  try {
    const response = await fetchWithConfig("api/v1/company/test", "GET")
    if (response) {
      return response.toString()
    }
  } catch (error) {
    throw new Error("Failed to fetch user data")
  }
  return null
}

export async function fetchCompaniesWithUrlAndPage(url: string, page: number) {
  try {
    const response = await fetchWithConfig(
      `/api/v1/company/${url}page=${page}`,
      "GET"
    )
    if (response) {
      const data: Page<Company> = response
      return data
    }
  } catch (error) {
    throw new Error("Failed to fetch company data")
  }
  return null
}

export async function fetchCompanyBySearchTerm(
  searchTerm: string,
  page: number
) {
  try {
    const response = await fetchWithConfig(
      `/api/v1/company/search-by-name?companyName=${searchTerm}&page=${page}`,
      "GET"
    )
    if (response) {
      const data: Page<CompanyDetails> = response
      return data
    }
  } catch (error) {
    throw new Error("Failed to fetch company data")
  }
  return null
}

export async function fetchCompnayById(id: string) {
  try {
    const response = await fetchWithConfig(
      `/api/v1/company/get-by-id/${id}`,
      "GET"
    )
    if (response) {
      return response
    }
  } catch (error) {
    throw new Error("Failed to fetch company data")
  }
  return null
}
