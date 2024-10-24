import './style.css'

import { Sheet, Skeleton, Table, Typography } from '@mui/joy'
import { useQueryClient } from '@tanstack/react-query'
import { FC, Fragment, useEffect, useState } from 'react'

import { Column } from '../../../data/types/columns'
import { Company } from '../../../data/types/company'
import { Page } from '../../../data/types/index.types'
import commonMessages from '../../../services/intl/common.messages'
import { formatMessage } from '../../../services/intl/intl'
import { fetchCompanyScrap } from '../../../utils/api/queries'
import { GlobalErrorButton } from '../../common/Buttons/GlobalErrorButton'
import Pagination from '../../common/Buttons/Pagination'
import { handleChangeStatut } from '../../common/Icons/stautIcon.util'
import TableCompanyHeaders from './components/TableCompanyHeaders'
import TableCompanyRow from './components/TableCompanyRow'
import { canBeScrapped, chunkArray } from './tableCompany.util'

type TableCompanyProps = {
  data: Page<Company> | undefined
  columns: Column[]
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
  columns,
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
    if (data) {
      setTableData(data)
    }
  }, [data])

  useEffect(() => {
    if (!data?.content || !isScrapping) return

    const fetchBatchCompanies = async () => {
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

                  return prevData
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

        await Promise.all(batchPromises)
      }
    }

    fetchBatchCompanies()
  }, [data, queryClient, isScrapping])

  const handleStatusChange = (company: Company) => {
    const updatedCompany = handleChangeStatut({ company })

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
    console.error('Error fetching companies:', error)
    return <GlobalErrorButton error={error} />
  }

  if (data && data.empty) {
    return (
      <div
        style={{
          marginRight: 'auto',
          //fontSize: '19px',
          //border: '10px solid var(--joy-palette-border)',
        }}
      >
        <Typography level="h4" style={{ marginTop: 20 }}>
          {formatMessage(commonMessages.noCompaniesFound)}
        </Typography>
      </div>
    )
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
                handleDetailsClick={handleDetailsClick}
                handleStatusChange={handleStatusChange}
                isCheckboxVisible={isCheckboxVisible}
                rowSelected={rowSelected}
                setRowSelected={setRowSelected}
              />
            ) : (
              <Fragment>
                {Array.from({ length: 10 }, (_, i) => (
                  <tr key={i} className="fade-in">
                    <td colSpan={columns.length}>
                      <Skeleton animation="wave" variant="text" />
                    </td>
                  </tr>
                ))}
              </Fragment>
            )}
          </tbody>
        </Table>
      </Sheet>
      {isPagination && tableData && tableData.totalPages > 0 ? (
        <Pagination
          dataPagination={{
            page: tableData?.number ?? 0,
            totalPages: tableData?.totalPages ?? 0,
          }}
          handleChangePage={handleChangePage}
        />
      ) : undefined}
    </>
  )
}

export default TableCompany
