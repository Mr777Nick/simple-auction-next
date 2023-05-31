import Typography from '@mui/material/Typography';

import Link from '../link';

export default function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="#">
        EasyAuction
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
