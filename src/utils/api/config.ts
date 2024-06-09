import { toast } from 'react-toastify'

import { toastErrorQuotaExceeded } from '../../components/common/Toasts/toasts'
import { ErrorFromApi } from '../../data/errors/errorFromApi'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

/**
 * Fetches data from the API with the provided configuration.
 * @param url - The URL to fetch data from.
 * @param method - The HTTP method to use for the request.
 * @param options - Additional options for the fetch request.
 * @returns A Promise that resolves to the fetched data.
 * @throws An error if the API request fails.
 * @example fetchWithConfig("/api/v1/data", "POST")
 */
export const fetchWithConfig = async (
  url: string,
  method: HttpMethod,
  options?: { body?: any; headers?: Record<string, string> },
): Promise<Response> => {
  const baseUrl = import.meta.env.VITE_API_PREFIX

  const response = await fetch(baseUrl + url, {
    ...options,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  })

  switch (response.status) {
    case 401:
    case 403:
      const errorData: ErrorFromApi = await response.json()
      toast.error(errorData.message)
      throw new Error(errorData.message)
    case 429:
      toastErrorQuotaExceeded()
      throw new Error('Too many requests')
    case 200:
    case 201:
    case 204:
      break
    default:
      throw new Error(`Failed to fetch data from ${url} - ${response.status}`)
  }

  return response
}
