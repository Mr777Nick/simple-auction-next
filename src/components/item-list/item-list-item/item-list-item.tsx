import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import theme from '../../../config/theme';
import { Item, ItemStatus } from '../../../libs/types/item';

export default function ItemListItem({
  item,
  variant,
}: {
  item: Item;
  variant: 'ongoing' | 'completed' | 'my';
}) {
  const { name, startPrice, currentPrice, endedAt, id, soldPrice, status } =
    item;

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

  if (variant === 'ongoing') {
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
        <Grid container item xs={3}>
          <Typography variant="body1">{name}</Typography>
        </Grid>
        <Grid container item xs={3} justifyContent={'center'}>
          <Typography variant="body1">{`$ ${currentPrice ?? 0}`}</Typography>
        </Grid>
        <Grid container item xs={3} justifyContent={'center'}>
          <Typography variant="body1">
            {`${hourRemaining ?? '--'}h ${minuteRemaining ?? '--'}m ${
              secondRemaining ?? '--'
            }s`}
          </Typography>
        </Grid>
        <Grid container item xs={3} justifyContent={'flex-end'}>
          <Button variant={'contained'} onClick={() => console.log(id)}>
            Bid
          </Button>
        </Grid>
      </Grid>
    );
  }

  if (variant === 'completed') {
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
        <Grid container item xs={4}>
          <Typography variant="body1">{name}</Typography>
        </Grid>
        <Grid container item xs={4} justifyContent={'center'}>
          <Typography variant="body1">
            {`${new Date(endedAt).toLocaleDateString()} ${new Date(
              endedAt,
            ).toLocaleTimeString()}`}
          </Typography>
        </Grid>
        <Grid container item xs={4} justifyContent={'flex-end'}>
          <Typography variant="body1">
            {soldPrice ? `$ ${soldPrice ?? 0}` : 'Not Sold'}
          </Typography>
        </Grid>
      </Grid>
    );
  }

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
      <Grid container item xs={3}>
        <Typography variant="body1">{name}</Typography>
      </Grid>
      <Grid container item xs={2} justifyContent={'center'}>
        <Typography variant="body1">{`$ ${startPrice}`}</Typography>
      </Grid>
      <Grid container item xs={2} justifyContent={'center'}>
        <Typography variant="body1">
          {currentPrice != startPrice ? `$ ${currentPrice}` : 'No Bid'}
        </Typography>
      </Grid>
      <Grid container item xs={3} justifyContent={'center'}>
        <Typography variant="body1">
          {status === ItemStatus.ACTIVE
            ? `${hourRemaining ?? '--'}h ${minuteRemaining ?? '--'}m ${
                secondRemaining ?? '--'
              }s`
            : `${new Date(endedAt).toLocaleDateString()} ${new Date(
                endedAt,
              ).toLocaleTimeString()}`}
        </Typography>
      </Grid>
      <Grid container item xs={2} justifyContent={'flex-end'}>
        <Typography variant="body1">
          {soldPrice ? `$ ${soldPrice ?? 0}` : 'Not Sold'}
        </Typography>
      </Grid>
    </Grid>
  );
}
