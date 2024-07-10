import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SearchParams {
  legalStatus: string[]
  activityArea: string[]
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
        legalStatus: [],
        activityArea: [],
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
