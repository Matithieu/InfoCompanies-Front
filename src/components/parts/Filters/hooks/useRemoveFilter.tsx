import { FilterParams } from '@/stores/FiltersStore'
import { useEffect } from 'react'

export const useRemoveFilter = (
  displayedFilters: FilterParams,
  handleSearch: () => void,
  prevDisplayedFiltersRef: React.MutableRefObject<FilterParams>,
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<Array<keyof FilterParams>>
  >,
) => {
  useEffect(() => {
    const prevFilters = prevDisplayedFiltersRef.current
    const currFilters = displayedFilters

    // Find filters whose value transitioned from set to cleared
    const clearedFilters = (
      Object.keys(currFilters) as Array<keyof FilterParams>
    ).filter((key) => {
      const prevValue = prevFilters[key]
      const currValue = currFilters[key]

      const wasSet =
        prevValue !== null &&
        prevValue !== undefined &&
        (!Array.isArray(prevValue) || prevValue.length > 0) &&
        prevValue !== false

      const isCleared =
        currValue === null ||
        currValue === undefined ||
        (Array.isArray(currValue) && currValue.length === 0) ||
        currValue === false

      return wasSet && isCleared
    })

    if (clearedFilters.length > 0) {
      setSelectedFilters((prevSelected) =>
        prevSelected.filter((filter) => !clearedFilters.includes(filter)),
      )
      handleSearch()
    }

    prevDisplayedFiltersRef.current = currFilters
  }, [
    displayedFilters,
    handleSearch,
    prevDisplayedFiltersRef,
    setSelectedFilters,
  ])
}
