import {
  CheckStatus,
  CompanyDTO,
  CompanyDtoWithStatusDTO,
  NonNullableUserCompanyStatus,
} from '@/types/index.types'

interface HandleChangeStatutProps {
  company: CompanyDTO
  userCompanyStatus: NonNullableUserCompanyStatus
}

export function handleChangeCompanyStatut({
  company,
  userCompanyStatus,
}: HandleChangeStatutProps): CompanyDtoWithStatusDTO {
  return {
    companyDTO: company,
    userCompanyStatus,
  } satisfies CompanyDtoWithStatusDTO
}

// TODO: Translate
export const statusEnumToString = (statut: CheckStatus | undefined) => {
  switch (statut) {
    case 'NOT_DONE':
    case undefined:
      return 'Non fait'
    case 'TO_DO':
      return 'À faire'
    case 'DONE':
      return 'Fait'
  }
}
