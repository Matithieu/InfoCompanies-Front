import { ColumnGenerics } from '@/types/columns/columns.type'
import { CompanyDetails } from '@/types/index.types'

export type SearchColumnGenerics = ColumnGenerics<
  keyof CompanyDetails,
  never,
  CompanyDetails
>
