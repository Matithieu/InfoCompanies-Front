import { Leader } from '../../data/types/leader'
import { fetchWithConfig } from './config'
import { cleanLeaders } from './util'

export const fetchLeadersBySirens = async (siren: string) => {
  const response = await fetchWithConfig(
    `/v1/leader/get-by-siren?siren=${siren}`,
    'GET',
  )

  if (response) {
    const leaders = (await response.json()) as Leader[]
    const cleanedLeaders = cleanLeaders(leaders)
    return cleanedLeaders
  }

  throw new Error('Failed to fetch leaders by siren')
}

export const fetchLeaderById = async (id: string) => {
  const response = await fetchWithConfig(
    `/v1/leader/get-by-id?id=${id}}`,
    'GET',
  )

  if (response) {
    return (await response.json()) as Leader
  }

  throw new Error('Failed to fetch leader by id')
}
