import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SxProps, Theme } from '@mui/material/styles';
import React from 'react';

import Link from '../../link';

type NavigationItemProps = {
  text: string;
  url: string;
  icon?: JSX.Element;
  sx?: SxProps<Theme>;
  dataTestId?: string;
};

export default function NavigationItem(props: NavigationItemProps) {
  const { text, url, icon, sx, dataTestId } = props;

  return (
    <ListItem key={text} disablePadding sx={sx}>
      <Link
        href={url}
        color="inherit"
        style={{ textDecoration: 'none', width: '100%' }}
        data-testid={dataTestId}
      >
        <ListItemButton>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText primary={text} />
        </ListItemButton>
      </Link>
    </ListItem>
  );
}
