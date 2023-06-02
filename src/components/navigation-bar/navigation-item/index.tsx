import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';

import Link from '../../link';

type NavigationItemProps = {
  text: string;
  url: string;
  icon: JSX.Element;
};

export default function NavigationItem(props: NavigationItemProps) {
  const { text, url, icon } = props;

  return (
    <ListItem key={text} disablePadding>
      <Link
        href={url}
        color="inherit"
        style={{ textDecoration: 'none', width: '100%' }}
      >
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
}
