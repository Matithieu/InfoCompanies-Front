import { PaginationTableCompany } from '@/components/parts/TableCompany/tableCompany.type'
import { useState } from 'react'

export const usePagination = (initialPage = 0, rowsPerPage = 10) => {
  const [pagination, setPagination] = useState<PaginationTableCompany>({
    page: initialPage,
    rowsPerPage,
    totalPages: 0,
  })

  const setPage = (page: number) => {
    setPagination((prevValue) => ({
      ...prevValue,
      page,
    }))
  }

  return [pagination, setPage] as const
}

export default usePagination
