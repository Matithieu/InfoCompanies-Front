import { CheckStatus } from '../data/types/company'
import { companiesSeenStorage } from './localStorage/companiesSeenStorage'

export const manageIsChecked = (
  companyId: number,
  currentStatus: CheckStatus,
) => {
  const { companiesToDo, companiesDone } = companiesSeenStorage()
  const checkedToDo = companiesToDo.getCompaniesTodo()
  const checkedDone = companiesDone.getCompaniesDone()

  const removeFromList = (list: number[], id: number) => {
    const index = list.indexOf(id)

    if (index !== -1) {
      list.splice(index, 1)
    }
  }

  removeFromList(checkedDone, companyId)
  removeFromList(checkedToDo, companyId)

  switch (currentStatus) {
    case CheckStatus.DONE:
      checkedDone.push(companyId)
      break
    case CheckStatus.TO_DO:
      checkedToDo.push(companyId)
      break
  }

  companiesToDo.updateCompaniesTodo(checkedToDo)
  companiesDone.updateCompaniesDone(checkedDone)
}
