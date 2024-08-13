import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, Typography } from '@mui/joy'

import { listOfRegions } from '../../../../data/ListOfOptions/region'
import { SearchParams } from '../../../../store/filtersStore'
import { fetchAutoComplete } from '../../../../utils/api'
import SimpleAutoComplete from '../../../common/AutoComplete/autoComplete'
import FetchAutoComplete from '../../../common/AutoComplete/fetchAutoComplete'

const getFilterComponents = (
  searchTerm: SearchParams,
  handleSelectChange: (
    field: keyof SearchParams,
  ) => (selectedValue: string[] | unknown[]) => void,
  handleSearch: () => void,
) => ({
  legalForm: (
    <Box sx={{ flexShrink: 0, maxWidth: '250px' }}>
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
    </Box>
  ),
  industrySector: (
    <Box sx={{ flexShrink: 0, maxWidth: '250px' }}>
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
    </Box>
  ),
  region: (
    <Box sx={{ flexShrink: 0, maxWidth: '250px' }}>
      <SimpleAutoComplete
        handleSelectChange={handleSelectChange('region')}
        isLabelHidden={searchTerm.region.length > 0}
        label="Région"
        options={listOfRegions}
        selectedValues={searchTerm.region}
      />
    </Box>
  ),
  city: (
    <Box sx={{ flexShrink: 0, maxWidth: '250px' }}>
      <FetchAutoComplete
        fetchFunction={(searchTerm) => fetchAutoComplete('city', searchTerm)}
        getOptionLabel={(option) => option.name}
        handleSelectChange={handleSelectChange('city')}
        inputLabel="Ville"
        isLabelHidden={searchTerm.city.length > 0}
        queryKeyBase="cities"
        value={searchTerm.city}
      />
    </Box>
  ),
  searchButton: (
    <Box sx={{ flexShrink: 0, maxWidth: '250px' }}>
      <Button
        fullWidth
        endDecorator={<SearchIcon />}
        variant="soft"
        onClick={handleSearch}
      >
        <Typography> Rechercher</Typography>
      </Button>
    </Box>
  ),
})

export default getFilterComponents
