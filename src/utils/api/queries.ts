import { operations } from '@/types/codegen/api'
import {
  AutocompleteByIdsQueries,
  AutocompleteByNamesQueries,
  AutocompleteEndpoint,
} from '@/types/index.types'

import { customFetch } from './network/customFetch'

/**
 *
 * User
 *
 */
export async function fetchUser() {
  return await customFetch('/v1/users/me', 'get')
}

// Company
export async function fetchCompaniesOnLandingPage(
  query: operations['getCompaniesOnLandingByFilters']['parameters']['query'],
) {
  return await customFetch('/v1/companies/landing', 'get', {
    parameters: { query },
  })
}

export async function fetchRandomUnseenCompanies(
  query: operations['getRandomUnseenCompanies']['parameters']['query'],
) {
  return await customFetch('/v1/companies/random', 'get', {
    parameters: { query },
  })
}

export async function fetchCompaniesWithFilters(
  requestBody: NonNullable<
    operations['getCompaniesByFilters']['requestBody']
  >['content']['application/json'],
) {
  return await customFetch('/v1/companies/filter', 'post', {
    requestBody,
  })
}

export async function feetchCompaniesByName(
  query: operations['searchCompaniesByName']['parameters']['query'],
) {
  return await customFetch('/v1/companies/', 'get', {
    parameters: { query },
  })
}

export async function fetchCompanyById(
  path: operations['getCompanyById']['parameters']['path'],
) {
  return await customFetch(`/v1/companies/{id}`, 'get', {
    parameters: { path },
  })
}

export async function fetchCompanyScrap(
  path: operations['scrapCompany']['parameters']['path'],
) {
  return await customFetch('/v1/companies/{id}/scrap', 'get', {
    parameters: { path },
  })
}

export async function fetchFavoritesCompanies(
  query: operations['getCompaniesSeenByUser']['parameters']['query'],
) {
  return await customFetch('/v1/companies/seen', 'get', {
    parameters: { query },
  })
}

export async function updateUser(
  query: operations['updateUser']['parameters']['query'],
) {
  return await customFetch('/v1/users/me', 'put', {
    parameters: { query },
  })
}

// Leader
export async function fetchLeaderBySiren(
  path: operations['getLeaderBySiren']['parameters']['path'],
) {
  return await customFetch('/v1/leaders/by-siren/{siren}', 'get', {
    parameters: { path },
  })
}

export async function fetchLeaderById(
  path: operations['getLeaderById']['parameters']['path'],
) {
  return await customFetch(`/v1/leaders/{id}`, 'get', {
    parameters: { path },
  })
}

// AutoComplete
export async function fetchAutoCompleteByNames(
  autoComplete: AutocompleteEndpoint,
  requestBody: AutocompleteByNamesQueries,
) {
  return await customFetch(`/v1/autocomplete/${autoComplete}/names`, 'post', {
    requestBody,
  })
}

export async function fetchAutoCompleteByIds(
  autoComplete: AutocompleteEndpoint,
  requestBody: AutocompleteByIdsQueries,
) {
  return await customFetch(`/v1/autocomplete/${autoComplete}/ids`, 'post', {
    requestBody,
  })
}

// Configuration
export async function fetchConfiguration() {
  return await customFetch('/v1/configuration/', 'get')
}

// Stripe
export async function startStripeSubscription(
  header: operations['newSubscriptionWithTrial']['parameters']['header'],
) {
  return await customFetch('/v1/payments/subscriptions/trial', 'post', {
    parameters: { header },
  })
}

// AI
export async function fetchConversationDetails(
  path: operations['getSingleConversation']['parameters']['path'],
) {
  return await customFetch(`/v1/conversations/{conversationId}`, 'get', {
    parameters: { path },
  })
}

export async function fetchConversationMessages(
  path: operations['getConversationHistory']['parameters']['path'],
) {
  return await customFetch(
    `/v1/conversations/{conversationId}/messages`,
    'get',
    {
      parameters: { path },
    },
  )
}

export async function fetchAllUserConversationsDetails() {
  return await customFetch('/v1/conversations/', 'get')
}

export async function deleteConversationById(
  path: operations['deleteConversation']['parameters']['path'],
) {
  return await customFetch(`/v1/conversations/{conversationId}`, 'delete', {
    parameters: { path },
  })
}
