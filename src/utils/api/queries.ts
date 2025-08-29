import { operations } from '@/types/codegen/api'
import {
  AutocompleteByNameQueries,
  AutocompleteByNamesQueries,
  AutocompleteEndpointPlural,
  AutocompleteEndpointSingular,
} from '@/types/index.types'

import { fetchThroughProxy } from './config'

/**
 *
 * User
 *
 */
export const fetchUser = async () => {
  return await fetchThroughProxy('/v1/user', 'get')
}

// Company
export async function fetchCompanyOnLandingPage(
  query: operations['getCompaniesOnLandingByFilters']['parameters']['query'],
) {
  return await fetchThroughProxy('/v1/company/landing-filter', 'get', {
    parameters: { query },
  })
}

export async function fetchRandomUnseenCompany(
  query: operations['getRandomUnseenCompanies']['parameters']['query'],
) {
  return await fetchThroughProxy('/v1/company/random-unseen', 'get', {
    parameters: { query },
  })
}

export async function fetchCompaniesWithFilters(
  requestBody: NonNullable<
    operations['getCompaniesByFilters']['requestBody']
  >['content']['application/json'],
) {
  return await fetchThroughProxy('/v1/company/filter-by-parameters', 'post', {
    requestBody,
  })
}

export async function fetchCompanyByCompanyName(
  query: operations['searchCompaniesByName']['parameters']['query'],
) {
  return await fetchThroughProxy('/v1/company/search-by-name', 'get', {
    parameters: { query },
  })
}

export async function fetchCompanyById(
  path: operations['getCompanyById']['parameters']['path'],
) {
  return await fetchThroughProxy(`/v1/company/get-by-id/{id}`, 'get', {
    parameters: { path },
  })
}

export async function fetchCompanyScrap(
  query: operations['scrapCompany']['parameters']['query'],
) {
  return await fetchThroughProxy(`/v1/company/scrap`, 'get', {
    parameters: { query },
  })
}

export async function fetchFavorites(
  query: operations['getCompaniesSeenByUser']['parameters']['query'],
) {
  return await fetchThroughProxy(`/v1/company/get-seen-by-user`, 'get', {
    parameters: { query },
  })
}

export async function updateUser(
  query: operations['updateUser']['parameters']['query'],
) {
  return await fetchThroughProxy('/v1/update-user', 'put', {
    parameters: { query },
  })
}

// Leader
export const fetchLeadersBySiren = async (
  path: operations['getLeaderBySiren']['parameters']['path'],
) => {
  return await fetchThroughProxy(`/v1/leader/get-by-siren/{siren}`, 'get', {
    parameters: { path },
  })
}

export const fetchLeaderById = async (
  path: operations['getLeaderById']['parameters']['path'],
) => {
  return await fetchThroughProxy(`/v1/leader/get-by-id/{id}`, 'get', {
    parameters: { path },
  })
}

// AutoComplete
export async function fetchAutoCompleteByName(
  autoComplete: AutocompleteEndpointSingular,
  query: AutocompleteByNameQueries,
) {
  return await fetchThroughProxy(`/v1/autocomplete/${autoComplete}`, 'get', {
    parameters: { query },
  })
}

export async function fetchAutoCompleteByNames(
  autoComplete: AutocompleteEndpointPlural,
  query: AutocompleteByNamesQueries,
) {
  return await fetchThroughProxy(`/v1/autocomplete/${autoComplete}`, 'get', {
    parameters: { query },
  })
}

export async function fetchAutoCompleteByIds(
  autoComplete: AutocompleteEndpointSingular,
  ids: number[],
) {
  return await fetchThroughProxy(
    `/v1/autocomplete/${autoComplete}/ids`,
    'get',
    {
      parameters: { query: { query: ids } },
    },
  )
}

// Stripe
export async function startStripeSubscription(
  header: operations['newSubscriptionWithTrial']['parameters']['header'],
) {
  return await fetchThroughProxy('/v1/stripe/subscriptions/trial', 'post', {
    parameters: { header },
  })
}
