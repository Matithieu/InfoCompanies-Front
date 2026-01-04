import { operations } from '@/types/codegen/api'

import { customFetch } from './network/customFetch'

export async function updateUserOnboarding() {
  return await customFetch('/v1/users/complete-onboarding', 'post')
}

export async function updateSeenCompany(
  path: operations['updateStatus']['parameters']['path'],
  query: operations['updateStatus']['parameters']['query'],
) {
  return await customFetch(`/v1/companies/{id}/status`, 'post', {
    parameters: { path, query },
  })
}
