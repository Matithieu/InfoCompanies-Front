import SearchIcon from '@mui/icons-material/Search'
import { Button, Grid } from '@mui/joy'
import { FC, useEffect, useState } from 'react'

import { region } from '../../../data/ListOfOptions/Region'
import { AutoCompleteType } from '../../../data/types/common'
import { useCompanyFilterStore } from '../../../store/filtersStore'
import { fetchAutoComplete } from '../../../utils/api'
import SimpleAutoComplete from '../../common/AutoComplete/autoComplete'
import FetchAutoComplete from '../../common/AutoComplete/fetchAutoComplete'

interface SearchTerm {
  cities: AutoCompleteType[]
  industrySectors: AutoCompleteType[]
  legalForms: AutoCompleteType[]
  regions: string[]
}

const Filters: FC = () => {
  const { searchParams, setSearchParams } = useCompanyFilterStore()

  const [searchTerm, setSearchTerm] = useState<SearchTerm>({
    cities: [],
    industrySectors: [],
    legalForms: [],
    regions: [],
  })

  useEffect(() => {
    setSearchTerm({
      cities: searchParams.city,
      industrySectors: searchParams.industrySector,
      legalForms: searchParams.legalForm,
      regions: searchParams.region,
    })
  }, [searchParams])

  const handleSelectChange =
    (field: keyof SearchTerm) => (selectedValue: string[] | unknown[]) => {
      setSearchTerm((prevSearchTerm) => ({
        ...prevSearchTerm,
        [field]: selectedValue,
      }))
    }

  const handleSearch = () => {
    setSearchParams({
      legalForm: searchTerm.legalForms,
      industrySector: searchTerm.industrySectors,
      region: searchTerm.regions,
      city: searchTerm.cities,
    })
  }

  return (
    <div>
      <Grid
        container
        alignItems="center"
        maxWidth={800}
        padding="10px"
        spacing={1}
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          flexWrap: 'wrap',
        }}
        width="100%"
      >
        <Grid md={4} sm={6} xs={12}>
          <FetchAutoComplete<AutoCompleteType>
            fetchFunction={(searchTerm) =>
              fetchAutoComplete('legal-form', searchTerm)
            }
            getOptionLabel={(option) => option.name}
            handleSelectChange={handleSelectChange('legalForms')}
            inputLabel="Forme juridique"
            queryKeyBase="legal-form"
          />
        </Grid>
        <Grid md={4} sm={6} xs={12}>
          <FetchAutoComplete<AutoCompleteType>
            fetchFunction={(searchTerm) =>
              fetchAutoComplete('industry-sector', searchTerm)
            }
            getOptionLabel={(option) => option.name}
            handleSelectChange={handleSelectChange('industrySectors')}
            inputLabel="Secteur d'activité"
            queryKeyBase="industry-sector"
          />
        </Grid>
        <Grid md={4} sm={6} xs={12}>
          <SimpleAutoComplete
            handleSelectChange={handleSelectChange('regions')}
            label="Région"
            options={region}
            selectedValues={searchTerm.regions}
          />
        </Grid>
        <Grid md={4} sm={6} xs={12}>
          <FetchAutoComplete<AutoCompleteType>
            fetchFunction={(searchTerm) =>
              fetchAutoComplete('city', searchTerm)
            }
            getOptionLabel={(option) => option.name}
            handleSelectChange={handleSelectChange('cities')}
            inputLabel="Ville"
            queryKeyBase="cities"
          />
        </Grid>
        <Grid
          md={4}
          sm={6}
          sx={{ display: 'flex', alignItems: 'center' }}
          xs={12}
        >
          <Button
            style={{ marginBottom: '10px' }}
            variant="soft"
            onClick={handleSearch}
          >
            Rechercher <SearchIcon style={{ marginLeft: '6px' }} />
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Filters
