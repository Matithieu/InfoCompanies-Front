import { Company } from '@/data/types/company'
import { Page } from '@/data/types/index.types'
import { useState } from 'react'

type TableData = Page<Company> | undefined

export const useSetTableData = (data: TableData) => {
  const [tableData, setTableData] = useState<Page<Company> | undefined>(data)

  const updateCompanyData = (company: Company, updatedCompany: Company) => {
    setTableData((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          content: prevData.content.map((c) =>
            c.id === company.id ? updatedCompany : c,
          ),
        }
      }

      return prevData
    })
  }

  return [tableData, setTableData, updateCompanyData] as const
}

export default useSetTableData
