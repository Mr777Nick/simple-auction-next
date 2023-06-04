import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import theme from '../../../config/theme';

export default function ItemListHeader({
  variant,
}: {
  variant: 'ongoing' | 'completed' | 'my';
}) {
  if (variant === 'ongoing') {
    return (
      <>
        <Grid
          container
          item
          xs={3}
          padding={theme.spacing(2)}
          justifyContent={'flex-start'}
        >
          <Typography variant="body1">Name</Typography>
        </Grid>
        <Grid
          container
          item
          xs={3}
          padding={theme.spacing(2)}
          justifyContent={'center'}
        >
          <Typography variant="body1">Current Price</Typography>
        </Grid>
        <Grid
          container
          item
          xs={3}
          padding={theme.spacing(2)}
          justifyContent={'center'}
        >
          <Typography variant="body1">Duration</Typography>
        </Grid>

        <Grid
          container
          item
          xs={3}
          padding={theme.spacing(2)}
          justifyContent={'flex-end'}
        >
          <Typography variant="body1">Bid</Typography>
        </Grid>
      </>
    );
  }

  if (variant === 'completed') {
    return (
      <>
        <Grid
          container
          item
          xs={4}
          padding={theme.spacing(2)}
          justifyContent={'flex-start'}
        >
          <Typography variant="body1">Name</Typography>
        </Grid>
        <Grid
          container
          item
          xs={4}
          padding={theme.spacing(2)}
          justifyContent={'center'}
        >
          <Typography variant="body1">Ended At</Typography>
        </Grid>
        <Grid
          container
          item
          xs={4}
          padding={theme.spacing(2)}
          justifyContent={'flex-end'}
        >
          <Typography variant="body1">Sold Price</Typography>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid
        container
        item
        xs={3}
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
        <Typography variant="body1">Initial Price</Typography>
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
        xs={3}
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
        justifyContent={'flex-end'}
      >
        <Typography variant="body1">Sold Price</Typography>
      </Grid>
    </>
  );
}
