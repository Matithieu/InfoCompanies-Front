import { Leader } from '@/types/index.types'

export const removeLeadersWithSameName = (leaders: Leader[]): Leader[] => {
  const uniqueLeadersMap = new Map<string, Leader>()

  leaders.forEach((leader) => {
    const key = `${leader.firstName}-${leader.lastName}`

    if (!uniqueLeadersMap.has(key)) uniqueLeadersMap.set(key, leader)
  })

  return Array.from(uniqueLeadersMap.values())
}
