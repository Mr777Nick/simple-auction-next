import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

import Balance from '../../components/balance';
import DepositForm from '../../components/deposit/form';

export default function DepositLayout() {
  return (
    <Grid container component="main" maxWidth="xs" justifyContent={'center'}>
      <Balance />
      <Grid item xs={3} marginBottom={1}>
        <Divider />
      </Grid>
      <DepositForm />
    </Grid>
  );
}
