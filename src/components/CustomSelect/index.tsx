import React, { useState, useMemo } from "react";
import { FixedSizeList } from "react-window";
import {
  Box, FormControl, Select, InputLabel, ListSubheader,
  TextField, InputAdornment, Checkbox, ListItemText,
  MenuItem, OutlinedInput
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const containsText = (text, searchText) =>
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

const RenderRow = ({ index, style, data }) => {
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

const CustomSelect = ({ options, onSelectionChange, selectedValues, label, placeholder }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selectedValues || []);
  const [searchText, setSearchText] = useState("");

  const displayedOptions = useMemo(
    () => options.filter((option) => containsText(option, searchText)),
    [searchText, options]
  );

  const handleToggle = (value) => {
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
                )
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
              handleToggle
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
