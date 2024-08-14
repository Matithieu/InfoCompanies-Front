import AddIcon from '@mui/icons-material/Add'
import { Dropdown, Menu, MenuButton, MenuItem } from '@mui/joy'
import { Box } from '@mui/material'
import { FC, useEffect, useState } from 'react'

import {
  SearchParams,
  useCompanyFilterStore,
} from '../../../store/filtersStore'
import getFilterComponents from './components'
import { updateFilterStates } from './filter.util'

export interface FiltersProps {
  filtersToShow: Array<
    'legalForm' | 'industrySector' | 'region' | 'city' | 'searchButton'
  >
  showAddFilterButton: boolean
}

const Filters: FC<FiltersProps> = ({ filtersToShow, showAddFilterButton }) => {
  const { searchParams, setSearchParams } = useCompanyFilterStore()

  const [searchTerm, setSearchTerm] = useState<SearchParams>({
    city: searchParams.city || [],
    industrySector: searchParams.industrySector || [],
    legalForm: searchParams.legalForm || [],
    region: searchParams.region || [],
  })

  const [availableFilters, setAvailableFilters] = useState<
    FiltersProps['filtersToShow']
  >(
    filtersToShow.filter(
      (filter) =>
        filter !== 'searchButton' &&
        (!Object.keys(searchParams).includes(filter) ||
          !searchParams[filter as keyof SearchParams]?.length),
    ),
  )
  const [selectedFilters, setSelectedFilters] =
    useState<FiltersProps['filtersToShow']>(filtersToShow)

  const addFilter = (filter: FiltersProps['filtersToShow'][number]) => {
    setSelectedFilters((prevSelected) => [...prevSelected, filter])
    setAvailableFilters((prevAvailable) =>
      prevAvailable.filter((f) => f !== filter),
    )
  }

  useEffect(() => {
    updateFilterStates(
      filtersToShow,
      showAddFilterButton,
      searchTerm,
      selectedFilters,
      availableFilters,
      setSelectedFilters,
      setAvailableFilters,
    )
  }, [searchTerm, filtersToShow, showAddFilterButton])

  const handleSelectChange =
    (field: keyof SearchParams) => (selectedValue: string[] | unknown[]) => {
      setSearchTerm((prevSearchTerm) => ({
        ...prevSearchTerm,
        [field]: selectedValue,
      }))
    }

  const handleSearch = () => {
    setSearchParams({
      legalForm: searchTerm.legalForm,
      industrySector: searchTerm.industrySector,
      region: searchTerm.region,
      city: searchTerm.city,
    })
  }

  useEffect(() => {
    // Check if all filters are cleared, if so, reset the searchParams
    if (selectedFilters.length === 0) {
      setSearchParams({
        city: [],
        industrySector: [],
        legalForm: [],
        region: [],
      })
    }
  }, [selectedFilters.length, setSearchParams])

  const filterComponents = getFilterComponents(
    searchTerm,
    handleSelectChange,
    handleSearch,
  )

  if (showAddFilterButton === false) {
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
        {filtersToShow.map((filter) => (
          <div key={filter}>{filterComponents[filter]}</div>
        ))}
        <div>{filterComponents['searchButton']}</div>
      </Box>
    )
  }

  if (showAddFilterButton && availableFilters.length > 0) {
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
        {selectedFilters.map((filter) => (
          <div key={filter}>{filterComponents[filter]}</div>
        ))}

        <Dropdown>
          <MenuButton
            sx={{ flexShrink: 0, width: '40px', maxWidth: '250px' }}
            variant="soft"
          >
            <AddIcon style={{ fontSize: '1.2rem' }} />
          </MenuButton>
          <Menu>
            {availableFilters.map((filter) => (
              <MenuItem key={filter} onClick={() => addFilter(filter)}>
                {filter}
              </MenuItem>
            ))}
          </Menu>
        </Dropdown>

        {selectedFilters.length !== 0 && filterComponents['searchButton']}
      </Box>
    )
  }

  return null
}

export default Filters
