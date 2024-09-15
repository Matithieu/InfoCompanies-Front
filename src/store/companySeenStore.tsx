import { create } from 'zustand'

import { Company } from '../data/types/company'
import { CompanySeen } from '../data/types/company-seen'

type Store = {
  companiesSeen: CompanySeen[] | null
  setCompaniesSeen: (company: CompanySeen[] | null) => void
  addOneCompanySeen: (company: Company) => void
}

const useCompaniesSeenStore = create<Store>((set) => ({
  companiesSeen: null,
  setCompaniesSeen: (company) => set(() => ({ companiesSeen: company })),
  addOneCompanySeen: (company) => {
    const companySeen: CompanySeen = {
      userId: 0,
      companyId: company.id,
      status: company.checked,
    }

    set((state) => ({
      companiesSeen: state.companiesSeen
        ? [...state.companiesSeen, companySeen]
        : [companySeen],
    }))
  },
}))

export default useCompaniesSeenStore
