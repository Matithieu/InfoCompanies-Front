import { Autocomplete, FormControl, FormLabel } from '@mui/joy'

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
    <FormControl sx={{ marginBottom: 2 }}>
      <FormLabel>{label}</FormLabel>
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
