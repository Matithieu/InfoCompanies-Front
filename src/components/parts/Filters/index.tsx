import SearchIcon from '@mui/icons-material/Search'
import { Button, Typography } from '@mui/joy'
import { Box, Grid } from '@mui/material'
import { FC, Fragment, useEffect, useState } from 'react'

import { listOfRegions } from '../../../data/ListOfOptions/region'
import {
  SearchParams,
  useCompanyFilterStore,
} from '../../../store/filtersStore'
import { fetchAutoComplete } from '../../../utils/api'
import SimpleAutoComplete from '../../common/AutoComplete/autoComplete'
import FetchAutoComplete from '../../common/AutoComplete/fetchAutoComplete'

interface FiltersProps {
  filtersToShow: Array<
    'legalForm' | 'industrySector' | 'region' | 'city' | 'searchButton'
  >
}

const Filters: FC<FiltersProps> = ({ filtersToShow }) => {
  const { searchParams, setSearchParams } = useCompanyFilterStore()

  const [searchTerm, setSearchTerm] = useState<SearchParams>({
    city: [],
    industrySector: [],
    legalForm: [],
    region: [],
  })

  useEffect(() => {
    setSearchTerm({
      city: searchParams.city,
      industrySector: searchParams.industrySector,
      legalForm: searchParams.legalForm,
      region: searchParams.region,
    })
  }, [searchParams])

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

  const columnSize = Math.floor(12 / filtersToShow.length) as
    | 1
    | 2
    | 3
    | 4
    | 6
    | 12

  const filterComponents = {
    legalForm: (
      <Grid item md={columnSize} sm={6} xs={12}>
        <FetchAutoComplete
          fetchFunction={(searchTerm) =>
            fetchAutoComplete('legal-form', searchTerm)
          }
          getOptionLabel={(option) => option.name}
          handleSelectChange={handleSelectChange('legalForm')}
          inputLabel="Forme juridique"
          isLabelHidden={searchTerm.legalForm.length > 0}
          queryKeyBase="legal-form"
          value={searchTerm.legalForm}
        />
      </Grid>
    ),
    industrySector: (
      <Grid item md={columnSize} sm={6} xs={12}>
        <FetchAutoComplete
          fetchFunction={(searchTerm) =>
            fetchAutoComplete('industry-sector', searchTerm)
          }
          getOptionLabel={(option) => option.name}
          handleSelectChange={handleSelectChange('industrySector')}
          inputLabel="Secteur d'activité"
          isLabelHidden={searchTerm.industrySector.length > 0}
          queryKeyBase="industry-sector"
          value={searchTerm.industrySector}
        />
      </Grid>
    ),
    region: (
      <Grid item md={columnSize} sm={6} xs={12}>
        <SimpleAutoComplete
          handleSelectChange={handleSelectChange('region')}
          isLabelHidden={searchTerm.region.length > 0}
          label="Région"
          options={listOfRegions}
          selectedValues={searchTerm.region}
        />
      </Grid>
    ),
    city: (
      <Grid item md={columnSize} sm={6} xs={12}>
        <FetchAutoComplete
          fetchFunction={(searchTerm) => fetchAutoComplete('city', searchTerm)}
          getOptionLabel={(option) => option.name}
          handleSelectChange={handleSelectChange('city')}
          inputLabel="Ville"
          isLabelHidden={searchTerm.city.length > 0}
          queryKeyBase="cities"
          value={searchTerm.city}
        />
      </Grid>
    ),
    searchButton: (
      <Grid item md={columnSize} sm={6} xs={12}>
        <Button
          fullWidth
          endDecorator={<SearchIcon />}
          style={{ marginTop: '10px' }}
          variant="soft"
          onClick={handleSearch}
        >
          <Typography> Rechercher</Typography>
        </Button>
      </Grid>
    ),
  }

  return (
    <Box display="flex" justifyContent="center" maxWidth={1100}>
      <Grid
        container
        alignItems="center"
        justifyContent="flex-start"
        spacing={2}
      >
        {filtersToShow.map((filter) => (
          <Fragment key={filter}>{filterComponents[filter]}</Fragment>
        ))}
      </Grid>
    </Box>
  )
}

export default Filters
