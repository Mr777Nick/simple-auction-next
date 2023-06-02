import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import theme from '../../../config/theme';

export default function ItemListHeader({
  isCompleted,
}: {
  isCompleted: boolean;
}) {
  const columnSize = isCompleted ? 4 : 3;

  return (
    <>
      <Grid
        container
        item
        xs={columnSize}
        padding={theme.spacing(2)}
        justifyContent={'flex-start'}
      >
        <Typography variant="body1">Name</Typography>
      </Grid>
      {!isCompleted && (
        <Grid
          container
          item
          xs={columnSize}
          padding={theme.spacing(2)}
          justifyContent={'center'}
        >
          <Typography variant="body1">Current Price</Typography>
        </Grid>
      )}
      {/* Make the following grid to auto fill the available column size */}
      <Grid
        container
        item
        xs={columnSize}
        padding={theme.spacing(2)}
        justifyContent={'center'}
      >
        <Typography variant="body1">
          {isCompleted ? 'Sold At' : 'Duration'}
        </Typography>
      </Grid>
      {!isCompleted && (
        <Grid
          container
          item
          xs={columnSize}
          padding={theme.spacing(2)}
          justifyContent={'flex-end'}
        >
          <Typography variant="body1">Bid</Typography>
        </Grid>
      )}
      {isCompleted && (
        <Grid
          container
          item
          xs={columnSize}
          padding={theme.spacing(2)}
          justifyContent={'flex-end'}
        >
          <Typography variant="body1">Sold Price</Typography>
        </Grid>
      )}
    </>
  );
}
