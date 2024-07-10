import { UseMutationResult } from '@tanstack/react-query'

import { CheckStatus, Company } from '../../../data/types/company'
import { companiesSeenStorage } from '../../../utils/localStorage/companiesSeenStorage'
import { manageIsChecked } from '../../../utils/manageIsChecked'
import { parseJsonToCompany } from '../../../utils/parseJsonToObject'

export const updateCompaniesIcon = (companies: Company[]) => {
  const { companiesToDo, companiesDone } = companiesSeenStorage()

  const checkedToDo = companiesToDo.getCompaniesTodo()
  const checkedDone = companiesDone.getCompaniesDone()

  const companiesUpdated = companies
    .map((companyObj) => parseJsonToCompany(companyObj))
    .filter(Boolean) as Company[]

  const updatedCompanyData = companiesUpdated.map((company) => {
    if (checkedDone.includes(company.id)) {
      company.checked = CheckStatus.DONE
    } else if (checkedToDo.includes(company.id)) {
      company.checked = CheckStatus.TO_DO
    } else {
      company.checked = CheckStatus.NOT_DONE
    }

    return company
  })

  return updatedCompanyData
}

interface handleChangeStatutProps {
  company: Company
  mutation: UseMutationResult<null | undefined, Error, number, unknown>
}

export const handleChangeStatut = ({
  company,
  mutation,
}: handleChangeStatutProps) => {
  let newStatus: CheckStatus

  switch (company.checked) {
    case CheckStatus.NOT_DONE:
      newStatus = CheckStatus.TO_DO
      mutation.mutate(company.id)
      break
    case CheckStatus.TO_DO:
      newStatus = CheckStatus.DONE
      break
    case CheckStatus.DONE:
      newStatus = CheckStatus.NOT_DONE
      mutation.mutate(company.id)
      break
  }

  company.checked = newStatus
  manageIsChecked(company.id, newStatus)

  return company
}
