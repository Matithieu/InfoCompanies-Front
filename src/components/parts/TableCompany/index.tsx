import './style.css'

import { IconButton, Sheet, Table } from '@mui/joy'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC, useEffect, useState } from 'react'

import { columnsTableCompany } from '../../../data/types/columns'
import { Company } from '../../../data/types/company'
import { Page } from '../../../data/types/companyDetails'
import { fetchCompanyScrap, updateSeenCompany } from '../../../utils/api/index'
import { isNotNU } from '../../../utils/assertion.util'
import { GlobalErrorButton } from '../../common/buttons/GlobalErrorButton'
import Pagination from '../../common/buttons/Pagination'
import StatutIcon from '../../common/Icons/StatutIcon'
import {
  handleChangeStatut,
  updateCompaniesIcon,
} from '../../common/Icons/stautIcon.util'
import { TableSkeleton } from '../../common/Loaders/Skeleton'
import TableCompanyHeaders from './components/TableCompanyHeaders'
import TableCompanyRow from './components/TableCompanyRow'
import { canBeScrapped, chunkArray } from './index.util'

type TableCompanyProps = {
  data: Page<Company> | undefined | null
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
  const [tableData, setTableData] = useState<Page<Company> | null | undefined>(
    data,
  )
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
                queryKey: ['company', company.id],
                queryFn: () => fetchCompanyScrap(company.id),
                retry: 0,
              })
              const updatedCompany = { ...company, ...scrapResult }

              // Update the UI immediately for this company
              setTableData((prevData) => ({
                ...prevData!,
                content: prevData!.content.map((c) =>
                  c.id === company.id ? updatedCompany : c,
                ),
              }))

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

  if (isPending) {
    return <TableSkeleton columns={columnsTableCompany} />
  } else if (data && data !== null && data.empty) {
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
  } else if (isNotNU(tableData)) {
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
              {tableData.content.map((row, index) => (
                <tr
                  key={row.id}
                  className={`table-row ${index % 2 === 0 ? 'even' : 'odd'}`}
                  tabIndex={-1}
                  // eslint-disable-next-line react/jsx-sort-props
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDetailsClick(row)
                    setRowSelected(row.id)
                  }}
                  role="row"
                  style={{
                    cursor: 'pointer',
                    backgroundColor:
                      rowSelected === row.id
                        ? 'var(--joy-palette-background-level2)'
                        : undefined,
                  }}
                >
                  {isCheckboxVisible ? (
                    <td align="center">
                      <IconButton
                        id={`checkbox-${index}`}
                        style={{
                          border: 'none',
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                          fontSize: '22px',
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleStatusChange(row)
                        }}
                      >
                        <StatutIcon statut={row.checked} />
                      </IconButton>
                    </td>
                  ) : undefined}
                  {columnsTableCompany.slice(1).map((column) => (
                    <td
                      key={column.id}
                      align={column.align}
                      style={{
                        maxWidth: '20px',
                        maxHeight: '1.5em',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <TableCompanyRow column={column} row={row} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
        {isPagination ? (
          <Pagination
            dataPagination={{
              page: tableData.number,
              totalPages: tableData.totalPages,
            }}
            handleChangePage={handleChangePage}
          />
        ) : null}
      </>
    )
  }
}

export default TableCompany
