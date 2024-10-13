import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Contact } from '../components/parts/Filters/components/ContactFilter'
import { SocialMedia } from '../data/types/company'
import { AutoCompleteType, EmployeeFilter } from '../data/types/index.types'

export interface SearchParams {
  city: AutoCompleteType[]
  industrySector: AutoCompleteType[]
  legalForm: AutoCompleteType[]
  region: string[]
  employee: EmployeeFilter
  socials: Array<keyof SocialMedia>
  contact: Array<keyof Contact>
  isCompanySeen: boolean
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
        contact: [],
        isCompanySeen: false,
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
