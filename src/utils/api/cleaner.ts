import { Leader } from '../../data/types/leader'

/**
 * Clean leaders by removing duplicates based on their first and last names
 * Remove also the empty leaders (null values on firstName or lastName)
 */
export const cleanLeaders = (leaders: Leader[]) => {
  const cleanedLeaders = leaders.filter(
    (leader, index, self) =>
      leader.firstName !== null &&
      leader.lastName !== null &&
      index ===
        self.findIndex(
          (t) =>
            t.firstName === leader.firstName && t.lastName === leader.lastName,
        ),
  )

  return cleanedLeaders
}
