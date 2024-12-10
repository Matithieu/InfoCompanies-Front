import { SearchParams } from '../../../stores/filtersStore'

import { FiltersProps } from '.'

export const updateFilterStates = (
  filtersToShow: FiltersProps['filtersToShow'],
  showAddFilterButton: boolean,
  searchTerm: SearchParams,
  selectedFilters: FiltersProps['filtersToShow'],
  availableFilters: FiltersProps['filtersToShow'],
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<FiltersProps['filtersToShow']>
  >,
  setAvailableFilters: React.Dispatch<
    React.SetStateAction<FiltersProps['filtersToShow']>
  >,
) => {
  if (showAddFilterButton) {
    const newSelectedFilters = filtersToShow.filter((filter) => {
      // Check if the filter key exists in searchTerm and is an array or has a valid condition
      const value = searchTerm[filter as keyof SearchParams]

      if (filter === 'searchButton') {
        return true
      }

      if (Array.isArray(value)) {
        return value.length > 0
      } else if (
        typeof value === 'object' &&
        value !== null &&
        'amount' in value
      ) {
        // Handle the EmployeeFilter case
        return value.amount !== undefined
      }

      // Handle the boolean case
      if (typeof value === 'boolean' && value) {
        return true
      }

      return false
    })

    const newAvailableFilters = filtersToShow.filter((filter) => {
      const value = searchTerm[filter as keyof SearchParams]

      if (filter === 'searchButton') {
        return false
      }

      if (Array.isArray(value)) {
        return value.length === 0
      } else if (
        typeof value === 'object' &&
        value !== null &&
        'amount' in value
      ) {
        // Handle the EmployeeFilter case
        return value.amount === undefined
      }

      // Handle the boolean case
      if (typeof value === 'boolean' && value) {
        return false
      }

      return true
    })

    if (
      JSON.stringify(newSelectedFilters) !== JSON.stringify(selectedFilters)
    ) {
      setSelectedFilters(newSelectedFilters)
    }

    if (
      JSON.stringify(newAvailableFilters) !== JSON.stringify(availableFilters)
    ) {
      setAvailableFilters(newAvailableFilters)
    }
  } else {
    if (JSON.stringify(selectedFilters) !== JSON.stringify(filtersToShow)) {
      setSelectedFilters(filtersToShow)
    }
  }
}
