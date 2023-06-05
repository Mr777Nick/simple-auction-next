import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

import { useAuthContext } from '../../../libs/context/auth';

export default function UserNavigationItem() {
  const { user } = useAuthContext();

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText data-testid={'user-name'} primary={user?.name ?? ''} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary={'Your Wallet Balance'} />
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton>
          <AttachMoneyIcon />
          <ListItemText data-testid={'user-balance'} primary={user?.balance} />
        </ListItemButton>
      </ListItem>
    </>
  );
}
