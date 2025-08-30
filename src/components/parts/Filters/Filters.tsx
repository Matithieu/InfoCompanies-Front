import { formatMessage } from '@/services/intl/intl'
import { FilterParams, useCompanyFilterStore } from '@/stores/FiltersStore'
import { SearchParamsNonNullable } from '@/types/index.types'
import { isNotNU } from '@/utils/assertion.util'
import AddIcon from '@mui/icons-material/Add'
import { Dropdown, ListDivider, Menu, MenuButton, MenuItem } from '@mui/joy'
import { Box, Tooltip } from '@mui/material'
import { FC, useRef, useState } from 'react'

import renderFilterComponents from './components'
import { SearchFilter } from './components/SearchFilter'
import {
  filterNamesMapping,
  filterToShowToFilterKeyMapping,
} from './filter.type'
import filtersMessages from './filters.messages'
import { useRemoveFilter } from './hooks/useRemoveFilter'

export interface FiltersProps {
  filtersToShow: Array<keyof SearchParamsNonNullable>
  showAddFilterButton: boolean
}

const Filters: FC<FiltersProps> = ({ filtersToShow, showAddFilterButton }) => {
  const { filterValues, setFilterValues } = useCompanyFilterStore()
  const [displayedFilters, setDisplayedFilters] =
    useState<FilterParams>(filterValues)

  const [selectedFilters, setSelectedFilters] = useState<
    FiltersProps['filtersToShow']
  >(
    filtersToShow.filter((filter) => {
      const filterKey = filterToShowToFilterKeyMapping[filter]
      const value = filterValues[filterKey]
      return (
        isNotNU(value) &&
        (!Array.isArray(value) || value.length > 0) &&
        value !== false
      )
    }),
  )

  const addFilter = (filter: FiltersProps['filtersToShow'][number]) =>
    setSelectedFilters((prevSelected) => [...prevSelected, filter])

  const handleSearch = () => setFilterValues(displayedFilters)

  const filterComponents = renderFilterComponents({
    filterValues,
    displayedValues: displayedFilters,
    setCurrentFilterValues: setDisplayedFilters,
  })

  // TODO: Check if all filters are cleared, remove all the filters
  // Track previous displayedFilters for comparison
  const prevDisplayedFiltersRef = useRef<FilterParams>(displayedFilters)

  useRemoveFilter(
    displayedFilters,
    handleSearch,
    prevDisplayedFiltersRef,
    setSelectedFilters,
  )

  if (showAddFilterButton === false) {
    return (
      <Box
        aria-label="filters"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {filtersToShow.map((filter) => (
          <div key={filter}>{filterComponents[filter]}</div>
        ))}
        <div>
          <SearchFilter handleSearch={handleSearch} />
        </div>
      </Box>
    )
  }

  if (showAddFilterButton) {
    // determine filters that can still be added
    const availableFilters = filtersToShow.filter(
      (filter) => !selectedFilters.includes(filter),
    )
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'auto',
          alignItems: 'center',
          gap: 1,
        }}
      >
        {/* Render selected filter components */}
        {selectedFilters.map((filter) => (
          <div key={filter}>{filterComponents[filter]}</div>
        ))}
        {/* Dropdown to add new filters */}
        {availableFilters.length > 0 && (
          <Dropdown>
            <div id="joyride-step-2">
              <Tooltip title={formatMessage(filtersMessages.addFilter)}>
                <MenuButton
                  sx={{
                    flexShrink: 0,
                    width: '40px',
                    maxWidth: '250px',
                  }}
                  variant="soft"
                >
                  <AddIcon style={{ fontSize: '1.2rem' }} />
                </MenuButton>
              </Tooltip>
            </div>
            <Menu sx={{ zIndex: 3000 }}>
              {availableFilters.map((filter, index) => (
                <div key={index}>
                  <MenuItem onClick={() => addFilter(filter)}>
                    {filterNamesMapping[filter]}
                  </MenuItem>
                  {index < availableFilters.length - 1 && <ListDivider />}
                </div>
              ))}
            </Menu>
          </Dropdown>
        )}
        {/* Search button displayed when filters selected */}
        {selectedFilters.length > 0 && (
          <SearchFilter handleSearch={handleSearch} />
        )}
      </Box>
    )
  }

  return null
}

export default Filters
