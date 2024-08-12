import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { AutoCompleteType } from '../data/types/common'

export interface SearchParams {
  city: AutoCompleteType[]
  industrySector: AutoCompleteType[]
  legalForm: AutoCompleteType[]
  region: string[]
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
