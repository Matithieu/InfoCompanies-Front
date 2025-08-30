import { operations } from '@/types/codegen/api'

import { fetchThroughProxy } from './config'

export async function updateUserOnboarding() {
  return await fetchThroughProxy('/v1/completeOnboarding', 'post')
}

export async function updateSeenCompany(
  query: operations['updateStatus']['parameters']['query'],
) {
  return await fetchThroughProxy(`/v1/companies-status/update-status`, 'post', {
    parameters: { query },
  })
}
