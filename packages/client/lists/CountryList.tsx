import { CodesOfCountry, COUNTRIES_MAP } from "@modules/constants";
import {
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
} from "@mui/material";

interface CountryListItemProps extends ListItemButtonProps {
  country: CodesOfCountry;
}

export const CountryListItem: React.FC<CountryListItemProps> = ({
  country,
  ...props
}) => (
  <ListItemButton {...props}>
    <ListItemText primary={COUNTRIES_MAP[country]} />
  </ListItemButton>
);
