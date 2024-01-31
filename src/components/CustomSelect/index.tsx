import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Checkbox,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { FixedSizeList } from "react-window";

const containsText = (text: string, searchText: string) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

const MenuProps = {
  PaperProps: {
    style: {
      marginTop: 5,
      maxHeight: 250,
      overflow: "hidden",
    },
  },
};

type RenderRowProps = {
  index: number;
  style: React.CSSProperties;
  data: {
    displayedOptions: string[];
    selectedOptions: string[];
    handleToggle: (value: string) => void;
  };
};

const RenderRow = ({ index, style, data }: RenderRowProps) => {
  const { displayedOptions, selectedOptions, handleToggle } = data;
  const option = displayedOptions[index];

  return (
    <MenuItem
      key={index}
      value={option}
      style={style}
      onClick={() => handleToggle(option)}
    >
      <Checkbox checked={selectedOptions.indexOf(option) > -1} />
      <ListItemText primary={option} />
    </MenuItem>
  );
};

type CustomSelectProps = {
  options: string[];
  onSelectionChange: (values: string[]) => void;
  selectedValues?: string[];
  label: string;
  placeholder: string;
  value?: string[];
};

const CustomSelect = ({
  options,
  onSelectionChange,
  selectedValues,
  label,
  placeholder,
  value,
}: CustomSelectProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    selectedValues || []
  );
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setSelectedOptions(value || []);
  }, [value]);

  const displayedOptions = useMemo(
    () => options.filter((option) => containsText(option, searchText)),
    [searchText, options]
  );

  const handleToggle = (value: string) => {
    const currentIndex = selectedOptions.indexOf(value);
    const newChecked = [...selectedOptions];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedOptions(newChecked);
    onSelectionChange(newChecked);
  };

  return (
    <Box sx={{ m: 0 }}>
      <FormControl fullWidth>
        <InputLabel id="universal-select-label">{label}</InputLabel>
        <Select
          multiple
          style={{ minWidth: 250, maxWidth: 250 }}
          MenuProps={MenuProps}
          labelId="universal-select-label"
          id="universal-select"
          value={selectedOptions}
          label="Options"
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(", ")}
          onClose={() => setSearchText("")}
        >
          <ListSubheader>
            <TextField
              size="small"
              autoFocus
              placeholder={placeholder}
              fullWidth
              style={{ marginBottom: 5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          <FixedSizeList
            height={250}
            width="100%"
            itemSize={46}
            itemCount={displayedOptions.length}
            itemData={{
              displayedOptions,
              selectedOptions,
              handleToggle,
            }}
          >
            {RenderRow}
          </FixedSizeList>
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomSelect;
