import {
  CheckStatus,
  CompanyDTO,
  CompanyDtoWithStatusDTO,
} from '@/types/index.types'
import { updateSeenCompany } from '@/utils/api/mutations'
import { asserts, isNotNU } from '@/utils/assertion.util'
import { useMutation } from '@tanstack/react-query'

type UseUpdateStatusProps = {
  updateCompanyData: (updatedCompany: CompanyDtoWithStatusDTO) => void
}

export const useUpdateStatus = ({
  updateCompanyData,
}: UseUpdateStatusProps) => {
  return useMutation({
    mutationFn: ({
      companyDTO,
      status,
    }: {
      companyDTO: CompanyDTO
      status: CheckStatus
    }) => updateSeenCompany({ companyId: companyDTO.id, status }),
    onError: (error) => {
      throw new Error(`Error updating recommendations: ${error.message}`)
    },
    onSuccess: (data, variables) => {
      asserts(isNotNU(data), 'updateSeenCompany is undefined')

      const updatedCompany = {
        companyDTO: variables.companyDTO,
        userCompanyStatus: data,
      } as const satisfies CompanyDtoWithStatusDTO
      updateCompanyData(updatedCompany)
    },
  })
}
