import { toast } from 'react-toastify'

import { ErrorJwtAuth } from '../../data/errors/errorAuthJwt'

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
  const response = await fetch(url, {
    ...options,
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  })

  if (response.status === 401 || response.status === 403) {
    const errorData: ErrorJwtAuth = await response.json()

    toast.error(errorData.message)
    throw new Error(errorData.message)
  }

  if (
    response.status !== 200 &&
    response.status !== 201 &&
    response.status !== 204
  ) {
    throw new Error(`Failed to fetch data from ${url} - ${response.status}`)
  }

  return response
}
