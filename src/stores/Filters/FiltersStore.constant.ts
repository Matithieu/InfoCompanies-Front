import { SearchParams, SearchParamsNonNullable } from '@/types/index.types'

// This needs to be refactored.
export type FilterParams = Omit<
  Required<
    SearchParams & {
      numberOfEmployeeFilter:
        | SearchParamsNonNullable['numberOfEmployeeFilter']
        | undefined
      contacts: NonNullable<SearchParamsNonNullable['contacts']> | null
      socials: NonNullable<SearchParamsNonNullable['socials']> | null
    }
  >,
  'page' | 'size'
>
