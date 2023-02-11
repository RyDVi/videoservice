import {
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
} from "@mui/material";

interface YearListItem extends ListItemButtonProps {
  year: number;
}

export const YearListItem: React.FC<YearListItem> = ({ year, ...props }) => (
  <ListItemButton {...props}>
    <ListItemText primary={year} />
  </ListItemButton>
);
