import Close from '@mui/icons-material/Close'
import {
  Autocomplete,
  AutocompleteOption,
  Chip,
  FormControl,
  ListItemContent,
} from '@mui/joy'
import { FC } from 'react'

type SimpleAutoCompleteProps = {
  label: string
  options: string[]
  selectedValues: string[]
  isLabelHidden?: boolean
  handleSelectChange: (selectedValue: string[]) => void
}

const SimpleAutoComplete: FC<SimpleAutoCompleteProps> = ({
  label,
  options,
  selectedValues,
  isLabelHidden,
  handleSelectChange,
}) => {
  return (
    <FormControl>
      <Autocomplete
        multiple
        getOptionLabel={(option) => option}
        limitTags={1}
        options={options}
        placeholder={isLabelHidden ? undefined : label}
        renderOption={(props, option) => (
          <AutocompleteOption {...props} key={option}>
            <ListItemContent>{option}</ListItemContent>
          </AutocompleteOption>
        )}
        renderTags={(tags, getTagProps) =>
          tags.map((selectedValue, index) => {
            const { key, ...otherTagProps } = getTagProps({ index })
            return (
              <Chip
                key={key}
                endDecorator={<Close fontSize="small" />}
                sx={{ minWidth: 0, maxWidth: '63%' }} // Max size to avoid break line
                {...otherTagProps}
              >
                {selectedValue}
              </Chip>
            )
          })
        }
        value={selectedValues}
        onChange={(_e, newValue) => handleSelectChange(newValue)}
      />
    </FormControl>
  )
}

export default SimpleAutoComplete
