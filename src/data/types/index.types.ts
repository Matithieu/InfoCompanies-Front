export const RANDOM_UNSEEN_ENDPOINT = 'random-unseen'
export const LANDING_FILTER_ENDPOINT = 'landing-filter'

export type AutoCompleteType = {
  id: number
  name: string
}

export type ComparatorType = '>' | '<' | '='
export type EmployeeFilter = {
  amount: number | undefined
  comparator: ComparatorType | undefined
}

export interface Page<T> {
  content: T[]
  pageable: {
    sort: {
      sorted: boolean
      unsorted: boolean
      empty: boolean
    }
    offset: number
    pageSize: number
    pageNumber: number
    paged: boolean
    unpaged: boolean
  }
  totalPages: number
  totalElements: number
  last: boolean
  size: number
  number: number
  sort: {
    sorted: boolean
    unsorted: boolean
    empty: boolean
  }
  numberOfElements: number
  first: boolean
  empty: boolean
}

export type Leader = {
  siren: string
  role: string
  lastName: string
  firstName: string
  gestionNumber: string
  type: string
  eventName: string
  usageName: string
  pseudo: string
  companyName: string
  legalForm: string
  idData: number
}

export type User = {
  id: string
  firstName: string
  lastName: string
  email: string
  userName: string
  password: string
  quota: string
  phone: string
  street: string
  locality: string
  region: string
  postalCode: string
  country: string
  tier: string
  isVerified: boolean
  hasCompletedOnboarding: boolean
}
