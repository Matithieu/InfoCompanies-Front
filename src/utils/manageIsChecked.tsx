import { CheckStatus } from '../data/types/company'
import { companiesSeenStorage } from './localStorage/companiesSeenStorage'

export const manageIsChecked = (
  companyId: number,
  currentStatus: CheckStatus,
): void => {
  const { companiesToDo, companiesDone } = companiesSeenStorage()
  const checkedToDo = new Set(companiesToDo.getCompaniesTodo())
  const checkedDone = new Set(companiesDone.getCompaniesDone())

  // Remove the companyId from both sets
  checkedToDo.delete(companyId)
  checkedDone.delete(companyId)

  // Add the companyId to the appropriate set based on currentStatus
  if (currentStatus === CheckStatus.DONE) {
    checkedDone.add(companyId)
  } else if (currentStatus === CheckStatus.TO_DO) {
    checkedToDo.add(companyId)
  }

  // Update the storage with the new sets
  companiesToDo.updateCompaniesTodo(Array.from(checkedToDo))
  companiesDone.updateCompaniesDone(Array.from(checkedDone))
}
