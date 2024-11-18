import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import AddIcon from '@mui/icons-material/Add'
import { Box } from '@mui/material'
import { FC, useEffect, useState } from 'react'

import {
  SearchParams,
  useCompanyFilterStore,
} from '../../../store/filtersStore'
import getFilterComponents from './components'
import { filterDescriptions, SelectedFilterType } from './filter.type'
import { updateFilterStates } from './filter.util'

export interface FiltersProps {
  filtersToShow: Array<
    | 'legalForm'
    | 'industrySector'
    | 'region'
    | 'city'
    | 'employee'
    | 'socials'
    | 'contact'
    | 'isCompanySeen'
    | 'searchButton'
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
    employee: searchParams.employee || {
      amount: undefined,
      comparator: undefined,
    },
    socials: searchParams.socials || [],
    contact: searchParams.contact || [],
    isCompanySeen: searchParams.isCompanySeen || false,
  })

  const [availableFilters, setAvailableFilters] = useState<
    FiltersProps['filtersToShow']
  >(
    filtersToShow.filter((filter) => {
      if (filter === 'searchButton') return false

      const filterValue = searchParams[filter as keyof SearchParams]

      // Check if the filterValue is an array and has length
      if (Array.isArray(filterValue)) {
        return filterValue.length === 0
      }

      // Check if it's an object like EmployeeFilter and handle it separately
      if (
        typeof filterValue === 'object' &&
        filterValue !== null &&
        'amount' in filterValue
      ) {
        return filterValue.amount === null
      }

      // Handle the boolean case
      if (typeof filterValue === 'boolean') {
        return !filterValue
      }

      // If it's not an array or object with `amount`, assume it's not selected
      return !filterValue
    }),
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
    // Don't add `searchTerm` to the dependencies array
  }, [searchTerm, filtersToShow, showAddFilterButton])

  const handleSelectChange =
    (field: keyof SearchParams) => (selectedValue: SelectedFilterType) => {
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
      employee: searchTerm.employee,
      socials: searchTerm.socials,
      contact: searchTerm.contact,
      isCompanySeen: searchTerm.isCompanySeen,
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
        employee: {
          amount: undefined,
          comparator: undefined,
        },
        socials: [],
        contact: [],
        isCompanySeen: false,
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

  if (showAddFilterButton) {
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

        {availableFilters.length > 0 && (
          <DropdownMenu>
            <div id="joyride-step-2">
              <DropdownMenuTrigger>
                <Button
                  style={{
                    flexShrink: 0,
                    width: '40px',
                    maxWidth: '250px',
                  }}
                >
                  <AddIcon fontSize="large" />
                </Button>
              </DropdownMenuTrigger>
            </div>

            <DropdownMenuContent style={{ zIndex: 3000 }}>
              {availableFilters.map((filter, index) => (
                <div key={filter}>
                  <DropdownMenuItem onClick={() => addFilter(filter)}>
                    {filterDescriptions[filter]}
                  </DropdownMenuItem>
                  {index === availableFilters.length - 1 ? (
                    ''
                  ) : (
                    <DropdownMenuSeparator />
                  )}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {selectedFilters.length !== 0 && filterComponents['searchButton']}
      </Box>
    )
  }

  return null
}

export default Filters
