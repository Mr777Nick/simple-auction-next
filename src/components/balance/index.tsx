import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import theme from '../../config/theme';
import { useAuthContext } from '../../libs/context/auth';

export default function Balance() {
  const { user } = useAuthContext();

  return (
    <Grid
      container
      item
      xs={12}
      justifyContent={'center'}
      marginBottom={theme.spacing(1)}
    >
      <Typography variant="h6">
        {user?.balance
          ? `Current Balance: $ ${user?.balance}`
          : `Current Balance: $ N\/A/`}
      </Typography>
    </Grid>
  );
}
