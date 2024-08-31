import Close from '@mui/icons-material/Close'
import { Autocomplete, Chip, FormControl } from '@mui/joy'

type SimpleAutoCompleteProps = {
  label: string
  options: string[]
  selectedValues: string[]
  isLabelHidden?: boolean
  handleSelectChange: (selectedValue: string[]) => void
}

const SimpleAutoComplete = ({
  label,
  options,
  selectedValues,
  isLabelHidden,
  handleSelectChange,
}: SimpleAutoCompleteProps) => {
  return (
    <FormControl>
      <Autocomplete
        multiple
        getOptionLabel={(option) => option}
        limitTags={1}
        options={options}
        placeholder={isLabelHidden ? undefined : label}
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
