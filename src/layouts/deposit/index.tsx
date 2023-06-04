import Grid from '@mui/material/Grid';

import DepositForm from '../../components/deposit/form';

export default function DepositLayout() {
  return (
    <Grid container component="main" maxWidth="xs" justifyContent={'center'}>
      <DepositForm />
    </Grid>
  );
}
