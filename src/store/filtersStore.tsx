import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { AutoCompleteType, EmployeeFilter } from '../data/types/common'
import { SocialMedia } from '../data/types/company'

export interface SearchParams {
  city: AutoCompleteType[]
  industrySector: AutoCompleteType[]
  legalForm: AutoCompleteType[]
  region: string[]
  employee: EmployeeFilter
  socials: Array<keyof SocialMedia>
}

interface CompanyFilterState {
  searchParams: SearchParams
  setSearchParams: (params: Partial<SearchParams>) => void
}

export const useCompanyFilterStore = create<CompanyFilterState>()(
  persist(
    (set) => ({
      searchParams: {
        city: [],
        industrySector: [],
        legalForm: [],
        region: [],
        employee: {
          amount: undefined,
          comparator: undefined,
        },
        socials: [],
      },
      setSearchParams: (params) => {
        set((state) => {
          const newParams = { ...state.searchParams, ...params }
          return { searchParams: newParams }
        })
      },
    }),
    {
      name: 'searchParams', // name of the item in the storage (must be unique)
    },
  ),
)
