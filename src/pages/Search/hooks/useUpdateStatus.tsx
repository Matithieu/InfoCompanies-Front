import {
  CheckStatus,
  CompanyDTO,
  CompanyDtoWithStatusDTO,
} from '@/types/index.types'
import { updateSeenCompany } from '@/utils/api/mutations'
import { asserts, isNotNullOrUndefined } from '@/utils/assertion.util'
import { useMutation } from '@tanstack/react-query'

type UseCompanyUpdateStatusProps = {
  updateCompanyData: (updatedCompany: CompanyDtoWithStatusDTO) => void
}

const useCompanyUpdateStatus = ({
  updateCompanyData,
}: UseCompanyUpdateStatusProps) => {
  return useMutation({
    mutationFn: ({
      companyDTO,
      status,
    }: {
      companyDTO: CompanyDTO
      status: CheckStatus
    }) => updateSeenCompany({ id: companyDTO.id }, { status }),
    onError: (error) => {
      throw new Error(`Error updating recommendations: ${error.message}`)
    },
    onSuccess: (data, variables) => {
      asserts(isNotNullOrUndefined(data), 'updateSeenCompany is undefined')

      const updatedCompany = {
        companyDTO: variables.companyDTO,
        userCompanyStatus: data,
      } as const satisfies CompanyDtoWithStatusDTO
      updateCompanyData(updatedCompany)
    },
  })
}

export default useCompanyUpdateStatus
