import { CheckStatus, Company } from '../../../data/types/company'

interface handleChangeStatutProps {
  company: Company
}

export const handleChangeStatut = ({ company }: handleChangeStatutProps) => {
  let newStatus: CheckStatus

  switch (company.userCompanyStatus.status) {
    case CheckStatus.NOT_DONE:
      newStatus = CheckStatus.TO_DO
      break
    case CheckStatus.TO_DO:
      newStatus = CheckStatus.DONE
      break
    case CheckStatus.DONE:
      newStatus = CheckStatus.NOT_DONE
      break
  }

  company.userCompanyStatus.status = newStatus

  return company
}

export const getStatutEnumPretty = (statut: CheckStatus) => {
  switch (statut) {
    case CheckStatus.NOT_DONE:
      return 'Non fait'
    case CheckStatus.TO_DO:
      return 'À faire'
    case CheckStatus.DONE:
      return 'Fait'
  }
}
