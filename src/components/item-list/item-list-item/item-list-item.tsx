import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';

import theme from '../../../config/theme';
import { Item, ItemStatus } from '../../../libs/types/item';
import CreateUpdateItemDialog from '../../dialog/create-update-item';
import DeleteItemDialog from '../../dialog/delete-item';
import CreateItemBidDialog from '../../dialog/item-bid';

export default function ItemListItem({
  onSuccessAction,
  item,
  variant,
}: {
  onSuccessAction: () => void;
  item: Item;
  variant: 'ongoing' | 'completed' | 'my';
}) {
  const {
    name,
    startPrice,
    currentPrice,
    endedAt,
    id,
    soldPrice,
    status,
    itemBids,
    isMine,
  } = item;

  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [openBidDialog, setOpenBidDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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
            <Tooltip title={isMine ? 'Cannot bid your own item' : ''}>
              <span>
                <Button
                  disabled={isMine}
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
          item={item}
          onSuccess={onSuccessAction}
        />
      </>
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
        <Grid container item xs={2} justifyContent={'flex-end'}>
          <Typography variant="body1">
            {soldPrice ? `$ ${soldPrice ?? 0}` : 'Not Sold'}
          </Typography>
        </Grid>
        <Grid container item xs={1} justifyContent={'flex-end'}>
          <Tooltip
            title={
              status !== ItemStatus.ACTIVE
                ? 'Completed item cannot be edited'
                : ''
            }
          >
            <span>
              <IconButton
                size={'small'}
                disabled={status !== ItemStatus.ACTIVE}
                color={'primary'}
                onClick={() => setOpenUpdateDialog(true)}
              >
                <EditIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip
            title={
              status !== ItemStatus.ACTIVE || itemBids.length > 0
                ? 'Completed item or item with active bid cannot be deleted'
                : ''
            }
          >
            <span>
              <IconButton
                size={'small'}
                disabled={status !== ItemStatus.ACTIVE || itemBids.length > 0}
                color={'error'}
                onClick={() => setOpenDeleteDialog(true)}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Grid>
      </Grid>
      <CreateUpdateItemDialog
        onSuccess={onSuccessAction}
        open={openUpdateDialog}
        setOpen={setOpenUpdateDialog}
        isEdit
        item={item}
      />
      <DeleteItemDialog
        onSuccess={onSuccessAction}
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        item={item}
        title={'Delete Item'}
        description={
          'Are you sure you want to delete this item? This action is irreversible.'
        }
      />
    </>
  );
}
