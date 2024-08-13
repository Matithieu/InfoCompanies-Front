import { Autocomplete, FormControl } from '@mui/joy'

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
        value={selectedValues}
        onChange={(_e, newValue) => handleSelectChange(newValue)}
      />
    </FormControl>
  )
}

export default SimpleAutoComplete
