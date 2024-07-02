export const COMPANIES_TODO_LOCAL_STORAGE_KEY = 'companies_to_do'
export const COMPANIES_DONE_LOCAL_STORAGE_KEY = 'comnpanies_done'

export const companiesSeenStorage = () => {
  const updateCompaniesTodo = (ids: number[]) => {
    localStorage.setItem(COMPANIES_TODO_LOCAL_STORAGE_KEY, JSON.stringify(ids))
  }

  const getCompaniesTodo = () => {
    return JSON.parse(
      localStorage.getItem(COMPANIES_TODO_LOCAL_STORAGE_KEY) || '[]',
    ) as number[]
  }

  const updateCompaniesDone = (ids: number[]) => {
    localStorage.setItem(COMPANIES_DONE_LOCAL_STORAGE_KEY, JSON.stringify(ids))
  }

  const getCompaniesDone = () => {
    return JSON.parse(
      localStorage.getItem(COMPANIES_DONE_LOCAL_STORAGE_KEY) || '[]',
    ) as number[]
  }

  return {
    companiesToDo: {
      updateCompaniesTodo,
      getCompaniesTodo,
    },
    companiesDone: {
      updateCompaniesDone,
      getCompaniesDone,
    },
  }
}
