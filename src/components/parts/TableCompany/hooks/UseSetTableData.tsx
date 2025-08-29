import {
  CompanyDtoWithStatusDTO,
  PageCompanyDtoWithStatusDTO,
} from '@/types/index.types'
import { useState } from 'react'

export const useSetTableData = (
  companiesDtoWithStatusDTO: PageCompanyDtoWithStatusDTO | undefined,
) => {
  const [tableData, setTableData] = useState<
    PageCompanyDtoWithStatusDTO | undefined
  >(companiesDtoWithStatusDTO)

  const updateCompanyData = (
    companyDtoWithStatusDTO: CompanyDtoWithStatusDTO,
  ) => {
    setTableData((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          content: prevData.content.map((prevCompanyDtoWithStatusDTO) =>
            prevCompanyDtoWithStatusDTO.companyDTO.id ===
            companyDtoWithStatusDTO.companyDTO.id
              ? companyDtoWithStatusDTO
              : prevCompanyDtoWithStatusDTO,
          ),
        }
      }

      return prevData
    })
  }

  return [tableData, setTableData, updateCompanyData] as const
}

export default useSetTableData
