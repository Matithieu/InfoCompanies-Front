import { ColumnGenerics } from '@/types/columns/columns.type'
import { CompanyDtoWithStatusDTO } from '@/types/index.types'

export type DashboardColumnGenerics = ColumnGenerics<
  keyof CompanyDtoWithStatusDTO['companyDTO'] | 'checked',
  | keyof NonNullable<CompanyDtoWithStatusDTO['companyDTO']['contact']>
  | keyof NonNullable<CompanyDtoWithStatusDTO['companyDTO']['socialMedia']>,
  CompanyDtoWithStatusDTO
>
