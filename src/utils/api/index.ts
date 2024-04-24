import { Company } from "../../data/types/company"
import { User } from "../../data/types/user"
import { CompanyDetails, Page } from "../../data/types/companyDetails"
import { parseJsonToCompany, parseJsonToUser } from "../parseJsonToObject"

import { fetchWithConfig } from "./config"

export const fetchUser = async () => {
  try {
    const response = await fetchWithConfig("/api/v1/user", "GET")

    if (response) {
      return parseJsonToUser(await response.json())
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
      const data: Page<Company> = await response.json()
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
      const data: Page<CompanyDetails> = await response.json()
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
      return parseJsonToCompany(await response.json())
    }
  } catch (error) {
    throw new Error("Failed to fetch company data")
  }

  return null
}

export async function updateUser(user: User) {
  try {
    const response = await fetchWithConfig("/api/v1/update-user", "PUT", {
      body: user,
    })

    if (response.ok) {
      return
    }
  } catch (error) {
    throw new Error("Failed to update user data")
  }

  return null
}
