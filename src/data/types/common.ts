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
