import './style.css'

import { Sheet, Table } from '@mui/joy'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'

import { columnsTableCompany } from '../../../data/types/columns'
import { Company } from '../../../data/types/company'
import { Page } from '../../../data/types/companyDetails'
import { fetchCompanyScrap, updateSeenCompany } from '../../../utils/api/index'
import { GlobalErrorButton } from '../../common/buttons/GlobalErrorButton'
import Pagination from '../../common/buttons/Pagination'
import {
  handleChangeStatut,
  updateCompaniesIcon,
} from '../../common/Icons/stautIcon.util'
import TableCompanyHeaders from './components/TableCompanyHeaders'
import TableCompanyRow from './components/TableCompanyRow'
import { canBeScrapped, chunkArray } from './index.util'

type TableCompanyProps = {
  data: Page<Company> | undefined
  handleDetailsClick: (company: Company) => void | undefined
  handleChangePage: (newPage: number) => void | undefined
  isPending: boolean
  error: Error | null
  isPagination?: boolean
  isCheckboxVisible?: boolean
  isScrapping?: boolean
}

const TableCompany: FC<TableCompanyProps> = ({
  data,
  error,
  isCheckboxVisible = true,
  isPagination = true,
  isPending,
  isScrapping = false,
  handleChangePage,
  handleDetailsClick,
}) => {
  const [tableData, setTableData] = useState<Page<Company> | undefined>(data)
  const [rowSelected, setRowSelected] = useState<number | null>(null)
  const queryClient = useQueryClient()

  useEffect(() => {
    setTableData(data)
  }, [data])

  // Send requests in batches when the table is rendered
  useEffect(() => {
    const fetchBatchCompanies = async () => {
      if (!data?.content || !isScrapping) return

      const companies = data.content
      const companyBatches = chunkArray(companies, 2)

      for (const batch of companyBatches) {
        const batchPromises = batch.map(async (company) => {
          if (canBeScrapped(company, null, false, false)) {
            try {
              const scrapResult = await queryClient.fetchQuery({
                staleTime: Infinity,
                queryKey: ['company', company.id],
                queryFn: () => fetchCompanyScrap(company.id),
                retry: 0,
              })
              const updatedCompany = { ...company, ...scrapResult }

              // Update the UI immediately for this company
              if (updatedCompany) {
                setTableData((prevData) => {
                  if (prevData) {
                    return {
                      ...prevData,
                      content: prevData.content.map((c) =>
                        c.id === company.id ? updatedCompany : c,
                      ),
                    }
                  }
                })
              }

              return updatedCompany
            } catch (error) {
              console.error(`Error fetching company ${company.id}:`, error)
              return company
            }
          }

          return company
        })

        // Wait for all companies in the batch to be processed before moving to the next batch
        await Promise.all(batchPromises)
      }
    }

    fetchBatchCompanies()
  }, [data, queryClient, isScrapping])

  const mutation = useMutation({
    mutationFn: (companyId: number) => updateSeenCompany([companyId]),
    onError: (error: Error) => {
      console.error(`Error updating recommendations: ${error.message}`)
    },
    onSuccess: () => {
      setTableData((prevData) => {
        if (prevData) {
          return {
            ...prevData,
            content: updateCompaniesIcon(prevData.content),
          }
        }

        return prevData
      })
    },
  })

  const handleStatusChange = (company: Company) => {
    const updatedCompany = handleChangeStatut({
      company,
      mutation,
    })
    setTableData((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          content: prevData.content.map((row) =>
            row.id === updatedCompany.id ? updatedCompany : row,
          ),
        }
      }

      return prevData
    })
  }

  if (error) {
    return <GlobalErrorButton error={error} />
  }

  if (data && data.empty) {
    return (
      <a
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '19px',
        }}
      >
        Aucune entreprise trouvée
      </a>
    )
  } else {
    return (
      <>
        <Sheet
          aria-label="order-table-container"
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
              columns={columnsTableCompany}
              isCheckboxVisible={isCheckboxVisible}
            />
            <tbody style={{ wordBreak: 'break-word' }}>
              <TableCompanyRow
                companies={tableData?.content}
                handleDetailsClick={handleDetailsClick}
                handleStatusChange={handleStatusChange}
                isCheckboxVisible={isCheckboxVisible}
                isPending={isPending}
                rowSelected={rowSelected}
                setRowSelected={setRowSelected}
              />
            </tbody>
          </Table>
        </Sheet>
        {isPagination ? (
          // to Fix
          <Pagination
            dataPagination={{
              page: tableData?.number ?? 0,
              totalPages: tableData?.totalPages ?? 0,
            }}
            handleChangePage={handleChangePage}
          />
        ) : null}
      </>
    )
  }
}

export default TableCompany
