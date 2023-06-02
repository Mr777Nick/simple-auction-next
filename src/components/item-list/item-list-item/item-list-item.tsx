import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import theme from '../../../config/theme';
import { Item } from '../../../libs/types/item';

export default function ItemListItem({
  item,
  isCompleted,
}: {
  item: Item;
  isCompleted: boolean;
}) {
  const { name, currentPrice, endedAt, id, soldPrice } = item;

  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(new Date(endedAt).getTime() - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [endedAt]);

  const hourRemaining = timeRemaining
    ? Math.floor(timeRemaining / (1000 * 60 * 60))
    : null;
  const minuteRemaining = timeRemaining
    ? Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
    : null;
  const secondRemaining = timeRemaining
    ? Math.floor((timeRemaining % (1000 * 60)) / 1000)
    : null;

  const columnSize = isCompleted ? 4 : 3;

  return (
    <Grid
      container
      item
      xs={12}
      component={Paper}
      marginTop={theme.spacing(1)}
      marginBottom={theme.spacing(1)}
      padding={theme.spacing(2)}
      alignItems={'center'}
    >
      <Grid container item xs={columnSize}>
        <Typography variant="body1">{name}</Typography>
      </Grid>
      {!isCompleted && (
        <Grid container item xs={columnSize} justifyContent={'center'}>
          <Typography variant="body1">{`$ ${currentPrice ?? 0}`}</Typography>
        </Grid>
      )}

      {!isCompleted && (
        <>
          <Grid container item xs={columnSize} justifyContent={'center'}>
            <Typography variant="body1">
              {`${hourRemaining ?? '--'}h ${minuteRemaining ?? '--'}m ${
                secondRemaining ?? '--'
              }s`}
            </Typography>
          </Grid>
          <Grid container item xs={columnSize} justifyContent={'flex-end'}>
            <Button variant={'contained'} onClick={() => console.log(id)}>
              Bid
            </Button>
          </Grid>
        </>
      )}
      {isCompleted && (
        <>
          <Grid container item xs={columnSize} justifyContent={'center'}>
            <Typography variant="body1">
              {`${new Date(endedAt).toLocaleDateString()} ${new Date(
                endedAt,
              ).toLocaleTimeString()}`}
            </Typography>
          </Grid>
          <Grid container item xs={columnSize} justifyContent={'flex-end'}>
            <Typography variant="body1">{`$ ${soldPrice ?? 0}`}</Typography>
          </Grid>
        </>
      )}
    </Grid>
  );
}
