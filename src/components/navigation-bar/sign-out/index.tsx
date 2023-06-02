import LogoutIcon from '@mui/icons-material/Logout';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

import { useAuthContext } from '../../../libs/context/auth';

export default function SignOutNavigationItem() {
  const { signOut } = useAuthContext();

  return (
    <ListItem key={'Sign Out'} disablePadding>
      <ListItemButton onClick={signOut}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary={'Sign Out'} />
      </ListItemButton>
    </ListItem>
  );
}
