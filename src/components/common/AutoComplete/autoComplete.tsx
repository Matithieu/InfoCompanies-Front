import { Autocomplete, FormControl, FormLabel } from '@mui/joy'

type SimpleAutoCompleteProps = {
  label: string
  options: string[]
  selectedValues: string[]
  handleSelectChange: (selectedValue: string[]) => void
}

const SimpleAutoComplete = ({
  label,
  options,
  selectedValues,
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
        placeholder={label}
        value={selectedValues}
        onChange={(_e, newValue) => handleSelectChange(newValue)}
      />
    </FormControl>
  )
}

export default SimpleAutoComplete
