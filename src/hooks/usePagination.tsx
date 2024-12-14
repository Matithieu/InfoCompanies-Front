import { useState } from 'react'

export type Pagination = {
  page: number
  rowsPerPage: number
  totalPages: number
}

export const usePagination = (initialPage = 0, rowsPerPage = 10) => {
  const [pagination, setPagination] = useState<Pagination>({
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
