import FetchAutoComplete from '@/components/common/AutoComplete/FetchAutoComplete'
import { fetchAutoCompleteByNames } from '@/utils/api/queries'
import { Box } from '@mui/joy'

import {
  mapAutocompleteParamsToEndpoints,
  mapFilterNames,
} from '../filter.constant'
import { AutocompleteFilterFields } from '../filter.type'

const buildAutocompleteComponent = <K extends keyof AutocompleteFilterFields>(
  autocompleteKey: K,
  filterValueNames: string[],
  handleSelectChange: (names: string[]) => void,
) => {
  return (
    <Box
      key={autocompleteKey}
      aria-label={mapFilterNames[autocompleteKey]}
      sx={{ flexShrink: 0, maxWidth: '250px' }}
    >
      <FetchAutoComplete
        autocompleteItems={filterValueNames}
        fetchAutocompleteByNames={(query) =>
          fetchAutoCompleteByNames(
            mapAutocompleteParamsToEndpoints[autocompleteKey],
            query,
          )
        }
        handleSelectChange={handleSelectChange}
        inputLabel={mapFilterNames[autocompleteKey]}
        isLabelHidden={filterValueNames === undefined}
        queryKeyBase={autocompleteKey}
      />
    </Box>
  )
}

export default buildAutocompleteComponent
