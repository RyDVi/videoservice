import {
  Divider,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  MenuList,
} from "@mui/material";
import Link from "next/link";
import { paths } from "../routes";
import MovieIcon from "@mui/icons-material/Movie";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import Sidebar from "./Sidebar";
import LogoutIcon from "@mui/icons-material/Logout";
import React from "react";
import CategoryIcon from "@mui/icons-material/Category";

const CrmSidebarMenu: React.FC = () => {
  return (
    <MenuList sx={{ a: { textDecoration: "none", color: "inherit" } }}>
      <ListSubheader>Основное</ListSubheader>
      <Link href={paths.films({})}>
        <MenuItem>
          <ListItemIcon>
            <MovieIcon />
          </ListItemIcon>
          <ListItemText>Фильмы</ListItemText>
        </MenuItem>
      </Link>
      <Link href={paths.customers({})}>
        <MenuItem>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText>Клиенты</ListItemText>
        </MenuItem>
      </Link>
      <Link href={paths.categories({})}>
        <MenuItem>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText>Категории</ListItemText>
        </MenuItem>
      </Link>
      <Link href={paths.genres({})}>
        <MenuItem>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText>Жанры</ListItemText>
        </MenuItem>
      </Link>
      <Divider />
      <Link href={paths.settings({})}>
        <MenuItem>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>Настройки</ListItemText>
        </MenuItem>
      </Link>
      <Link href={paths.logout({})}>
        <MenuItem>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>Выход</ListItemText>
        </MenuItem>
      </Link>
    </MenuList>
  );
};

export const CrmSidebar: React.FC = () => (
  <Sidebar>
    <CrmSidebarMenu />
  </Sidebar>
);
