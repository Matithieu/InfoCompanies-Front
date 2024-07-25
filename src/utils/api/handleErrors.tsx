import { toast } from 'react-toastify'

import { toastErrorQuotaExceeded } from '../../components/common/Toasts/toasts'
import { ErrorFromApi } from '../../data/errors/errorFromApi'

const handleErrors = async (response: Response, url: string) => {
  switch (response.status) {
    case 401:
      break

    case 403: {
      const errorData: ErrorFromApi = await response.json()
      toast.error(errorData.error)
      throw new Error(errorData.error)
    }

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
}

export default handleErrors
