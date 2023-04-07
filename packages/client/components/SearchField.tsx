import {
  Autocomplete,
  IconButton,
  InputBase,
  InputBaseProps,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import HelpIcon from "@mui/icons-material/Help";

export const HelpButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isHelpOpen, setHelpOpen] = React.useState(false);
  return (
    <Tooltip
      title={children}
      open={isHelpOpen}
      onClose={() => setHelpOpen(false)}
      onMouseEnter={() => setHelpOpen(true)}
      arrow
    >
      <IconButton onClick={() => setHelpOpen(!isHelpOpen)}>
        <HelpIcon />
      </IconButton>
    </Tooltip>
  );
};

export const HelpSearchFilmText: React.FC = () => (
  <Typography variant="caption">
    Введите всё, что помните о фильме: название, описание, актера, продюсера,
    режисера
  </Typography>
);

interface SearchFieldProps extends InputBaseProps {
  onSearch?: (searchText: string) => void;
  endButtons?: React.ReactNode;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  onSearch,
  endButtons,
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
        placeholder="Поиск"
        sx={{ flex: 1 }}
        onChange={(event) => setSearchText(event.target.value)}
        {...props}
      />
      <IconButton type="submit">
        <SearchIcon />
      </IconButton>
      {endButtons}
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
