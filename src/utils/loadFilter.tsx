export function loadCompaniesFilterFromLocalStorage(key) {
    const companiesFilter = localStorage.getItem(key);
    if (!companiesFilter) {
      return {};
    }
  
    try {
      const companyFilterObjs = JSON.parse(companiesFilter);
      return companyFilterObjs;
    } catch (error) {
      console.error('Error parsing companies filters from localStorage', error);
      return {};
    }
  }
  