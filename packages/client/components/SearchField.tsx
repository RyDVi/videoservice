import {
  Autocomplete,
  AutocompleteProps,
  IconButton,
  InputBase,
  InputBaseProps,
  Paper,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";

interface SearchFieldProps extends InputBaseProps {
  onSearch?: (searchText: string) => void;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  onSearch,
  ...props
}) => {
  const [searchText, setSearchText] = React.useState("");
  const handleSubmit = React.useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      onSearch && onSearch(searchText);
    },
    [onSearch, searchText]
  );
  return (
    <Paper
      sx={{ padding: "8px 1rem", display: "flex", width: 1 }}
      component="form"
      onSubmit={handleSubmit}
    >
      <InputBase
        name="search"
        placeholder="Поиск фильма"
        sx={{ flex: 1 }}
        onChange={(event) => setSearchText(event.target.value)}
        {...props}
      />
      <IconButton type="submit">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

interface SearchAutoCompleteProps {
  searchProps: SearchFieldProps;
}

// TODO: need implement
export const SearchAutocomplete: React.FC<SearchAutoCompleteProps> = ({
  searchProps,
}) => {
  const results = React.useRef([]);
  const [search, setSearch] = React.useState("");
  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={[{}]}
      renderInput={(params) => (
        <SearchField
          {...params}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          {...searchProps}
        />
      )}
    />
  );
};
