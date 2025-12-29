import { operations } from '@/types/codegen/api'

import { fetchThroughProxy } from './network/fetchThroughProxy'

export async function updateUserOnboarding() {
  return await fetchThroughProxy('/v1/user/complete-onboarding', 'post')
}

export async function updateSeenCompany(
  query: operations['updateStatus']['parameters']['query'],
) {
  return await fetchThroughProxy(`/v1/companies-status/update-status`, 'post', {
    parameters: { query },
  })
}
