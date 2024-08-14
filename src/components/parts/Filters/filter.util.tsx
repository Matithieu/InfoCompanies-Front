import { SearchParams } from '../../../store/filtersStore'

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
    const newSelectedFilters = filtersToShow.filter(
      (filter) =>
        filter === 'searchButton' ||
        (searchTerm[filter as keyof SearchParams] &&
          searchTerm[filter as keyof SearchParams].length > 0),
    )
    const newAvailableFilters = filtersToShow.filter(
      (filter) =>
        filter !== 'searchButton' &&
        (!searchTerm[filter as keyof SearchParams] ||
          searchTerm[filter as keyof SearchParams].length === 0),
    )

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
