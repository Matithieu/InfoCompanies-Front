import { CheckStatus } from '../data/types/company'

export const manageIsChecked = (
  companyId: number,
  currentStatus: CheckStatus,
) => {
  const checkedDone = JSON.parse(localStorage.getItem('checkedDone') || '[]')
  const checkedToDo = JSON.parse(localStorage.getItem('checkedToDo') || '[]')

  const removeFromList = (list: number[], id: number) => {
    const index = list.indexOf(id)

    if (index !== -1) {
      list.splice(index, 1)
    }
  }

  removeFromList(checkedDone, companyId as number)
  removeFromList(checkedToDo, companyId as number)

  switch (currentStatus) {
    case CheckStatus.DONE:
      checkedDone.push(companyId)
      break
    case CheckStatus.TO_DO:
      checkedToDo.push(companyId)
      break
  }

  localStorage.setItem('checkedDone', JSON.stringify(checkedDone))
  localStorage.setItem('checkedToDo', JSON.stringify(checkedToDo))
}
