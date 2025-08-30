import { Page } from '@/types/index.types'
import { useState } from 'react'

export const usePagination = (initialPage = 0) => {
  const [pagination, setPagination] = useState<Page>({
    page: initialPage,
    totalPages: 0,
  })

  return [pagination, setPagination] as const
}

export default usePagination
