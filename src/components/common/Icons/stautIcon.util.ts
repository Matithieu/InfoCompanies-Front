import { UseMutationResult } from '@tanstack/react-query'
import { CheckStatus, Company } from '../../../data/types/company'
import { companiesSeenStorage } from '../../../utils/localStorage/companiesSeenStorage'
import { parseJsonToCompany } from '../../../utils/parseJsonToObject'
import { manageIsChecked } from '../../../utils/manageIsChecked'

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
  setCompany?: (value: React.SetStateAction<Company>) => void
  setCompanies?: (value: Company[]) => void
}

export const handleChangeStatut = ({
  company,
  mutation,
  setCompany,
  setCompanies,
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
    default:
      newStatus = CheckStatus.NOT_DONE
      mutation.mutate(company.id)
  }

  company.checked = newStatus
  manageIsChecked(company.id, newStatus)

  if (setCompanies) {
    setCompanies(
      [company].map((item) => (item.id === company.id ? company : item)),
    )
  } else if (setCompany) {
    setCompany(company)
  }

  return newStatus
}
