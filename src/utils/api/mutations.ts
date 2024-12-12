import { CheckStatus } from '../../data/types/company'
import { fetchThroughProxy } from './config'
import handleStatusError from './errors/handleStatusError'

export const updateUserOnboarding = async () => {
  const response = await fetchThroughProxy('/v1/completeOnboarding', 'POST')

  if (response.ok) {
    return
  }

  throw new Error(
    await handleStatusError(response, 'Error updating user onboarding'),
  )
}

export async function updateSeenCompany(
  companyId: number,
  status: CheckStatus,
) {
  const response = await fetchThroughProxy(
    `/v1/companies-status/${companyId}`,
    'POST',
    {
      body: {
        status: status,
      },
    },
  )

  if (response.ok) {
    return
  }

  throw new Error(
    await handleStatusError(response, `Error updating seen company`),
  )
}
