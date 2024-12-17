import './style.css'

import { chunkArray } from '@/utils/array.util'
import { Sheet, Skeleton, Table } from '@mui/joy'
import { useQueryClient } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'

import { Column } from '../../../data/types/Columns/columns'
import { Company } from '../../../data/types/company'
import { Page } from '../../../data/types/index.types'
import { fetchCompanyScrap } from '../../../utils/api/queries'
import { GlobalErrorButton } from '../../common/Buttons/GlobalErrorButton'
import Pagination from '../../common/Buttons/Pagination'
import { handleChangeCompanyStatut } from '../../common/Icons/stautIcon.util'
import NoCompaniesFound from './components/NoCompaniesFound'
import TableCompanyHeaders from './components/TableCompanyHeaders'
import TableCompanyRow from './components/TableCompanyRow'
import useSetTableData from './hooks/UseSetTableData'
import { canBeScrapped } from './tableCompany.util'

type TableCompanyProps = {
  columns: Column[]
  data: Page<Company> | undefined
  error: Error | null
  isCheckboxVisible?: boolean
  isPagination?: boolean
  isPending: boolean
  isScrapping?: boolean
  onCompanyDetailsClick: (company: Company) => void | undefined
  onPageChange: (newPage: number) => void | undefined
}

const TableCompany: FC<TableCompanyProps> = ({
  columns,
  data,
  error,
  isCheckboxVisible = true,
  isPagination = true,
  isPending,
  isScrapping = false,
  onPageChange,
  onCompanyDetailsClick,
}) => {
  const [tableData, setTableData, updateCompanyData] = useSetTableData(data)
  const [rowSelected, setRowSelected] = useState<number | undefined>(undefined)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (data) {
      setTableData(data)
    }
  }, [setTableData, data])

  useEffect(() => {
    if (!data?.content || !isScrapping) return

    const fetchBatchCompanies = async () => {
      const companies = data.content
      const companyBatches = chunkArray(companies, 2)

      for (const batch of companyBatches) {
        const batchPromises = batch.map(async (company) => {
          if (canBeScrapped(company, undefined, false, false)) {
            try {
              const scrapResult = await queryClient.fetchQuery({
                staleTime: Infinity,
                queryKey: ['company', company.id],
                queryFn: () => fetchCompanyScrap(company.id),
                retry: 0,
              })

              const updatedCompany = { ...company, ...scrapResult }

              if (updatedCompany) {
                updateCompanyData(company, updatedCompany)
              }

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
  }, [data, queryClient, isScrapping])

  const handleStatusChange = (company: Company) => {
    const updatedCompany = handleChangeCompanyStatut({ company })

    // Update the company in the table
    updateCompanyData(company, updatedCompany)
  }

  if (error) {
    return <GlobalErrorButton error={error} />
  }

  if (data && data.empty) {
    return <NoCompaniesFound />
  }

  return (
    <>
      <Sheet
        aria-label="order-table-container"
        id="joyride-step-1"
        sx={{
          width: '100%',
          borderRadius: 'sm',
          minHeight: 0,
          overflow: 'auto',
        }}
        variant="outlined"
      >
        <Table
          hoverRow
          stickyHeader
          sx={{
            '--TableCell-headBackground':
              'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground':
              'var(--joy-palette-background-level2)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <TableCompanyHeaders
            columns={columns}
            isCheckboxVisible={isCheckboxVisible}
          />
          <tbody id="#joyride-step-1" style={{ wordBreak: 'break-word' }}>
            {!isPending && tableData?.content?.length ? (
              <TableCompanyRow
                columns={columns}
                companies={tableData?.content}
                isCheckboxVisible={isCheckboxVisible}
                rowSelected={rowSelected}
                onCompanyDetailsClick={onCompanyDetailsClick}
                onRowSelect={setRowSelected}
                onStatusUpdate={handleStatusChange}
              />
            ) : (
              <>
                {Array.from({ length: 10 }, (_, i) => (
                  <tr key={i} className="fade-in">
                    <td colSpan={columns.length}>
                      <Skeleton animation="wave" variant="text" />
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </Table>
      </Sheet>
      {isPagination && tableData && tableData.totalPages > 0 ? (
        <Pagination
          page={tableData?.number ?? 0}
          totalPages={tableData?.totalPages ?? 0}
          onPageChange={onPageChange}
        />
      ) : undefined}
    </>
  )
}

export default TableCompany
