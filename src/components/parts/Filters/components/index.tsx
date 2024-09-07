import SearchIcon from '@mui/icons-material/Search'
import { Box, Button, Switch, Typography } from '@mui/joy'

import { listOfRegions } from '../../../../data/ListOfOptions/region'
import { SearchParams } from '../../../../store/filtersStore'
import { fetchAutoComplete } from '../../../../utils/api'
import SimpleAutoComplete from '../../../common/AutoComplete/AutoComplete'
import FetchAutoComplete from '../../../common/AutoComplete/FetchAutoComplete'
import ComparatorInput from '../../../common/Input/ComparatorInput'
import { SelectedFilterType } from '../filter.type'
import ContactFilter from './ContactFilter'
import SocialsFilter from './SocialsFilter'

const getFilterComponents = (
  searchTerm: SearchParams,
  handleSelectChange: (
    field: keyof SearchParams,
  ) => (selectedValue: SelectedFilterType) => void,
  handleSearch: () => void,
) => ({
  legalForm: (
    <Box sx={{ flexShrink: 0, maxWidth: '250px' }}>
      <FetchAutoComplete
        fetchFunction={(searchTerm) =>
          fetchAutoComplete('legal-form', searchTerm)
        }
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
        handleSelectChange={handleSelectChange('city')}
        inputLabel="Ville"
        isLabelHidden={searchTerm.city.length > 0}
        queryKeyBase="cities"
        value={searchTerm.city}
      />
    </Box>
  ),
  employee: (
    <Box sx={{ flexShrink: 0, maxWidth: '250px' }}>
      <ComparatorInput
        value={searchTerm.employee}
        onValueChange={handleSelectChange('employee')}
      />
    </Box>
  ),
  socials: (
    <Box sx={{ flexShrink: 0, maxWidth: '200px', minWidth: '200px' }}>
      <SocialsFilter
        values={searchTerm.socials}
        onChange={handleSelectChange('socials')}
      />
    </Box>
  ),
  contact: (
    <Box sx={{ flexShrink: 0, maxWidth: '200px', minWidth: '200px' }}>
      <ContactFilter
        values={searchTerm.contact}
        onChange={handleSelectChange('contact')}
      />
    </Box>
  ),
  isCompanySeen: (
    <Box sx={{ flexShrink: 0 }}>
      <Typography
        component="label"
        endDecorator={
          <Switch
            checked={searchTerm.isCompanySeen}
            sx={{ ml: 1 }}
            onChange={() => {
              handleSelectChange('isCompanySeen')(!searchTerm.isCompanySeen)
            }}
          />
        }
      >
        Entreprises vues
      </Typography>
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
