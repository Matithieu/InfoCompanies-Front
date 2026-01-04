import { SearchParamsNonNullable } from '@/types/index.types'

export type AutocompleteFilterFields = Pick<
  SearchParamsNonNullable,
  'cityNames' | 'regionNames' | 'industrySectorNames' | 'legalFormNames'
>
