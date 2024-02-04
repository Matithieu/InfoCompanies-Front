import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Checkbox,
  Chip,
  Dropdown,
  FormControl,
  FormLabel,
  Input,
  ListSubheader,
  MenuButton,
  Select
} from "@mui/joy";
import React, { useEffect, useMemo, useState } from "react";
import { FixedSizeList } from "react-window";

const containsText = (text: string, searchText: string) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;

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
    <FormControl>
      <Dropdown>
        <MenuButton
          key={index}
          value={option}
          style={style}
          onClick={() => handleToggle(option)}
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            padding: "0.5rem",
            backgroundColor:
              selectedOptions.indexOf(option) !== -1 ? "primary.100" : "white",
            "&:hover": {
              backgroundColor: "primary.100",
            },
            overflowY: "hidden",
          }}
        >
          <Checkbox
            checked={selectedOptions.indexOf(option) !== -1}
            value={option}
            sx={{ marginRight: "0.5rem" }}
          />
          {option}
        </MenuButton>
      </Dropdown>
    </FormControl>
  );
};

type CustomSelectProps = {
  options: string[];
  onSelectionChange: (selectedValues: string[]) => void;
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
    selectedValues || [""]
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
    <FormControl>
      <FormLabel id="universal-select-label">{label}</FormLabel>
      <Select
        multiple
        style={{ minWidth: "15rem", maxWidth: "15rem" }}
        id="universal-select"
        renderValue={(selected) => (
          <Box sx={{ display: "flex", gap: "0.25rem" }}>
            {selected.map((selectedOption) => (
              <Chip variant="soft" color="primary">
                {selectedOption.label}
              </Chip>
            ))}
          </Box>
        )}
        value={selectedOptions}
        slotProps={{
          listbox: {
            sx: {
              width: "100%",
            },
          },
        }}
      >
        <FormControl>
          <ListSubheader>
            <Input
              size="sm"
              autoFocus
              placeholder={placeholder}
              style={{ marginBottom: 5 }}
              startDecorator={<SearchIcon />}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Escape") {
                  e.preventDefault();

                  if (displayedOptions.length > 0) {
                    handleToggle(displayedOptions[0]);
                  }

                  return;
                }
              }}
            />
          </ListSubheader>
          <FixedSizeList
            height={250}
            width="100%"
            itemSize={50}
            itemCount={displayedOptions.length}
            itemData={{
              displayedOptions,
              selectedOptions,
              handleToggle,
            }}
          >
            {RenderRow}
          </FixedSizeList>
        </FormControl>
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
