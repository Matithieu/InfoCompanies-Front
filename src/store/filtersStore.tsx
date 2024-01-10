import { create } from "zustand";

interface CompanyFilterState {
  searchParams: {
    legalStatus: string;
    activityArea: string;
    region: string;
  };
  setSearchParams: (params: { legalStatus?: string; activityArea?: string; region?: string }) => void;
}

const loadFiltersFromLocalStorage = () => {
  const storedFilters = JSON.parse(localStorage.getItem('searchParams') || '{}');
  return {
    searchParams: {
      legalStatus: storedFilters.legalStatus || '',
      activityArea: storedFilters.activityArea || '',
      region: storedFilters.region || '',
    },
  };
};

export const useCompanyFilterStore = create<CompanyFilterState>((set) => ({
  ...loadFiltersFromLocalStorage(),
  setSearchParams: (params) => {
    set((state) => {
      const newParams = { ...state.searchParams, ...params };
      localStorage.setItem('searchParams', JSON.stringify(newParams));
      return { searchParams: newParams };
    });
  },
}));
