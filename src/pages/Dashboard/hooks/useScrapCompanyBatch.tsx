import { canBeScrapped } from '@/components/parts/TableCompany/tableCompany.util'
import {
  CompanyDtoWithStatusDTO,
  PageCompanyDtoWithStatusDTO,
} from '@/types/index.types'
import { fetchCompanyScrap } from '@/utils/api/queries'
import { chunkArray } from '@/utils/array.util'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

type UseScrapCompanyBatchProps = {
  queryClient: ReturnType<typeof useQueryClient>
  tableData: PageCompanyDtoWithStatusDTO | undefined
  updateCompanyData: (updatedCompany: CompanyDtoWithStatusDTO) => void
}

export const useScrapCompanyBatch = ({
  queryClient,
  tableData,
  updateCompanyData,
}: UseScrapCompanyBatchProps) => {
  useEffect(() => {
    if (!tableData?.content) return

    const fetchBatchCompanies = async () => {
      const companies = tableData.content
      const companyBatches = chunkArray(companies, 2)

      for (const batch of companyBatches) {
        const batchPromises = batch.map(async (companyDtoWithStatusDTO) => {
          const { companyDTO: company } = companyDtoWithStatusDTO

          if (canBeScrapped(company, undefined, false, false)) {
            try {
              const scrapResult = await queryClient.fetchQuery({
                staleTime: Infinity,
                queryKey: ['company', company.id],
                queryFn: () => fetchCompanyScrap({ companyId: company.id }),
                retry: 0,
              })

              const updatedCompany = { ...company, ...scrapResult }
              // Avoid unnecessary state updates
              if (company === updatedCompany) return company

              const updatedCompanyData: CompanyDtoWithStatusDTO = {
                companyDTO: updatedCompany,
                userCompanyStatus: companyDtoWithStatusDTO.userCompanyStatus,
              }

              updateCompanyData(updatedCompanyData)
              return updatedCompany
            } catch (error) {
              console.error(`Error fetching company ${company.id}:`, error)
              return company
            }
          }

          return company
        })

        await Promise.all(batchPromises)
      }
    }

    fetchBatchCompanies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData, queryClient])
}
