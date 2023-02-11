import {
  Divider,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  MenuItem,
  MenuList,
} from '@mui/material';
import Link from 'next/link';
import paths from '../routes/paths';
import MovieIcon from '@mui/icons-material/Movie';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import Sidebar from './Sidebar';
import LogoutIcon from '@mui/icons-material/Logout';
import React from 'react';

const CrmSidebarMenu: React.FC = () => {
  return (
    <MenuList sx={{ a: { textDecoration: 'none', color:'inherit' } }}>
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

const CrmSidebar: React.FC = () => (
  <Sidebar>
    <CrmSidebarMenu />
  </Sidebar>
);
export default CrmSidebar;
