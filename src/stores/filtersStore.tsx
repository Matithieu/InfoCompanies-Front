import { SearchParams, SearchParamsNonNullable } from '@/types/index.types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

type CompanyFilterState = {
  filterValues: FilterParams
  setFilterValues: (params: FilterParams) => void
}

export const useCompanyFilterStore = create<CompanyFilterState>()(
  persist(
    (set) => ({
      filterValues: {
        cityNames: [],
        legalFormNames: [],
        industrySectorNames: [],
        regionNames: [],
        numberOfEmployeeFilter: null,
        contacts: null,
        isCompanySeen: false,
        socials: null,
      },
      setFilterValues: (params) => {
        set((state) => {
          const newParams = { ...state.filterValues, ...params }
          return { filterValues: newParams }
        })
      },
    }),
    {
      name: 'searchParams', // name of the item in the storage (must be unique)
    },
  ),
)
