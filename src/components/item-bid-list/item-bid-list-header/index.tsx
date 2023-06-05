import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import theme from '../../../config/theme';

export default function ItemBidListHeader() {
  return (
    <>
      <Grid
        container
        item
        xs={2}
        padding={theme.spacing(2)}
        justifyContent={'flex-start'}
      >
        <Typography variant="body1">Name</Typography>
      </Grid>
      <Grid
        container
        item
        xs={2}
        padding={theme.spacing(2)}
        justifyContent={'center'}
      >
        <Typography variant="body1">Your Bid</Typography>
      </Grid>
      <Grid
        container
        item
        xs={2}
        padding={theme.spacing(2)}
        justifyContent={'center'}
      >
        <Typography variant="body1">Latest Bid</Typography>
      </Grid>
      <Grid
        container
        item
        xs={2}
        padding={theme.spacing(2)}
        justifyContent={'center'}
      >
        <Typography variant="body1">Ended At</Typography>
      </Grid>
      <Grid
        container
        item
        xs={2}
        padding={theme.spacing(2)}
        justifyContent={'center'}
      >
        <Typography variant="body1">Status</Typography>
      </Grid>
      <Grid
        container
        item
        xs={2}
        padding={theme.spacing(2)}
        justifyContent={'flex-end'}
      >
        <Typography variant="body1">Bid</Typography>
      </Grid>
    </>
  );
}
