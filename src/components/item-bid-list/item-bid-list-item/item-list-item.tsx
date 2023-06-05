import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

import theme from '../../../config/theme';
import { ItemStatus } from '../../../libs/types/item';
import { ItemBid } from '../../../libs/types/item-bid';
import CreateItemBidDialog from '../../dialog/item-bid';

export default function ItemBidListItem({
  onSuccessAction,
  itemBid,
}: {
  onSuccessAction: () => void;
  itemBid: ItemBid;
}) {
  const { item, price } = itemBid;
  const { name, currentPrice, endedAt, status } = item;

  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [openBidDialog, setOpenBidDialog] = useState(false);

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

  const bidStillHighest = currentPrice === price;

  return (
    <>
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
        <Grid container item xs={2}>
          <Typography variant="body1">{name}</Typography>
        </Grid>
        <Grid container item xs={2} justifyContent={'center'}>
          <Typography variant="body1">{`$ ${price ?? 0}`}</Typography>
        </Grid>
        <Grid container item xs={2} justifyContent={'center'}>
          <Typography variant="body1">{`$ ${currentPrice ?? 0}`}</Typography>
        </Grid>
        <Grid container item xs={2} justifyContent={'center'}>
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
        <Grid container item xs={2} justifyContent={'center'}>
          <Typography variant="body1">
            {status === ItemStatus.SOLD && bidStillHighest && (
              <Tooltip title={'You won this item'}>
                <CheckBoxIcon color="success" />
              </Tooltip>
            )}
            {status !== ItemStatus.SOLD && bidStillHighest && (
              <Tooltip
                title={
                  'Auction is still in progress, your bid is currently the highest'
                }
              >
                <HourglassBottomIcon color="warning" />
              </Tooltip>
            )}
            {!bidStillHighest && (
              <Tooltip title={'This bid is outmatched by other bid'}>
                <DisabledByDefaultIcon color="error" />
              </Tooltip>
            )}
          </Typography>
        </Grid>
        <Grid container item xs={2} justifyContent={'flex-end'}>
          <Tooltip
            title={
              status === ItemStatus.SOLD ? 'This item is already sold' : ''
            }
          >
            <span>
              <Button
                disabled={status === ItemStatus.SOLD}
                variant={'contained'}
                onClick={() => setOpenBidDialog(true)}
              >
                Bid
              </Button>
            </span>
          </Tooltip>
        </Grid>
      </Grid>
      <CreateItemBidDialog
        open={openBidDialog}
        setOpen={setOpenBidDialog}
        item={itemBid?.item}
        onSuccess={onSuccessAction}
      />
    </>
  );
}
