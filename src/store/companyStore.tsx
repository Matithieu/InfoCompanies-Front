import { create } from 'zustand';
import Company from '../data/company';

type CompanyState = {
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
  selectedCompanyChecked: Company | null;
  setSelectedCompanyChecked: (company: Company | null) => void;
}

// Create a store using Zustand
export const useCompanyStore = create<CompanyState>((set) => ({
  selectedCompany: null,
  setSelectedCompany: (company) => set(() => ({ selectedCompany: company })),
  selectedCompanyChecked: null,
  setSelectedCompanyChecked: (company) => set(() => ({ selectedCompanyChecked: company })),
}));

// Usage in components remains the same
// const { selectedCompany, setSelectedCompany, ... } = useCompanyStore();
