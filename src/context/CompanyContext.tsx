import React, { createContext, useState, useContext, ReactNode } from 'react';
import Company from '../data/company';

interface CompanyContextType {
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
  selectedCompanyChecked: Company | null;
  setSelectedCompanyChecked: (company: Company | null) => void;
}

// Create a context with a default undefined value
const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

// Define the provider component
interface CompanyProviderProps {
  children: ReactNode;
}

export const CompanyProvider = ({ children }: CompanyProviderProps) => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedCompanyChecked, setSelectedCompanyChecked] = useState<Company | null>(null);

  return (
    <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany, selectedCompanyChecked, setSelectedCompanyChecked }}>
      {children}
    </CompanyContext.Provider>
  );
};

// Custom hook for using this context
export const useCompanyContext = (): CompanyContextType => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompanyContext must be used within a CompanyProvider');
  }
  return context;
};
