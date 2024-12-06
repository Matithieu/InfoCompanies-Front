import handleStatusError from '../api/errors/handleStatusError'
import { fetchToProxy } from './proxy'

export const fetchLoginProxy = async () => {
  const response = await fetchToProxy({
    method: 'GET',
    url: '/oauth2/sign_in',
  })

  if (response.ok) {
    return
  }

  throw new Error(await handleStatusError(response, 'Error fetching login'))
}
