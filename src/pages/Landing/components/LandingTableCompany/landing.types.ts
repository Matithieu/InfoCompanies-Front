import { ColumnGenerics } from '@/types/columns/columns.type'
import { CompanyDTO } from '@/types/index.types'

export type LandingColumnGenerics = ColumnGenerics<
  keyof CompanyDTO,
  | keyof NonNullable<CompanyDTO['contact']>
  | keyof NonNullable<CompanyDTO['socialMedia']>,
  CompanyDTO
>
