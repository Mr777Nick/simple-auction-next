import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Balance from '../../components/balance';
import DepositForm from '../../components/deposit/form';
import theme from '../../config/theme';

export default function DepositLayout() {
  return (
    <Grid container component="main" maxWidth="xs" justifyContent={'center'}>
      <Balance />
      <Grid item xs={3} marginBottom={1}>
        <Divider />
      </Grid>
      <Grid container item xs={12} justifyContent={'center'}>
        <Typography variant="h5" marginRight={theme.spacing(1)}>
          Deposit
        </Typography>
      </Grid>
      <DepositForm />
    </Grid>
  );
}
