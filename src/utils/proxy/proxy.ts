import { HttpMethod } from "../api/config";

interface fetchToProxyProps {
    url: string
    method: HttpMethod
    options?: { body?: any; headers?: Record<string, string> }
}

/**
 * Fetches data from a proxy server.
 * @param url - The URL to fetch data from.
 * @param method - The HTTP method to use for the request.
 * @param options - Additional options for the fetch request.
 * @returns A Promise that resolves to the response from the server.
 * @throws An error if the response status is not 200, 201, or 204.
 */
export const fetchToProxy = async ({ url, method, options }: fetchToProxyProps): Promise<Response> => {
    const response = await fetch("http://localhost" + url, {
        ...options,
        method: method,
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        body: options?.body ? JSON.stringify(options.body) : undefined,
    })

    if (
        response.status !== 200 &&
        response.status !== 201 &&
        response.status !== 204
    ) {
        throw new Error(`Failed to fetch data from ${url} - ${response.status}`)
    }

    return response
}