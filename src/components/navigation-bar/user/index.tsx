import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

import { useAuthContext } from '../../../libs/context/auth';

export default function UserNavigationItem() {
  const { user } = useAuthContext();

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemText primary={user?.name ?? ''} />
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
          <ListItemText primary={user?.balance} />
        </ListItemButton>
      </ListItem>
    </>
  );
}
