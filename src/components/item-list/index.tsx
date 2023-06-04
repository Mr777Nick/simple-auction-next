import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';

import theme from '../../config/theme';
import { Item } from '../../libs/types/item';
import CreateUpdateItemDialog from '../dialog/create-update-item';

import ItemListHeader from './item-list-header';
import ItemListItem from './item-list-item/item-list-item';

type ItemListProps = {
  title: string;
  isRefreshing: boolean | undefined;
  isEmpty: boolean;
  isLoadingMore: boolean | undefined;
  isReachingEnd: boolean | undefined;
  size: number;
  mutate: () => void;
  setSize: (size: number) => void;
  data: Item[][] | undefined;
  variant: 'ongoing' | 'completed' | 'my';
};

export default function ItemList(props: ItemListProps) {
  const {
    title,
    isRefreshing,
    isEmpty,
    isLoadingMore,
    isReachingEnd,
    size,
    mutate,
    setSize,
    data,
    variant,
  } = props;

  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  return (
    <>
      <CreateUpdateItemDialog
        onSuccess={mutate}
        open={openCreateDialog}
        setOpen={setOpenCreateDialog}
      />
      <Grid container component="main">
        <Grid container item xs={12} justifyContent={'space-between'}>
          <Grid container item xs={'auto'}>
            <Typography variant="h5" marginRight={theme.spacing(1)}>
              {title}
            </Typography>
            {variant === 'my' && (
              <Button
                variant="contained"
                onClick={() => setOpenCreateDialog(true)}
              >
                Create
              </Button>
            )}
          </Grid>
          <Grid item>
            <Button disabled={isRefreshing} onClick={() => mutate()}>
              {isRefreshing ? 'refreshing...' : 'refresh'}
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <ItemListHeader variant={variant} />
        </Grid>
        <Grid item xs={12}>
          <Divider flexItem />
        </Grid>
        <Grid container item xs={12}>
          {data &&
            data.map((items) => {
              return items.map((item) => {
                return (
                  <Fragment key={item.id}>
                    <ItemListItem item={item} variant={variant} />
                  </Fragment>
                );
              });
            })}
          {isEmpty && (
            <Grid container item xs={12} justifyContent={'center'} padding={2}>
              <Typography variant="body1">No items found.</Typography>
            </Grid>
          )}
        </Grid>
        <Grid container item xs={12} justifyContent={'center'}>
          {!isEmpty && (
            <Button
              disabled={isLoadingMore || isReachingEnd}
              onClick={() => setSize(size + 1)}
              fullWidth
            >
              {isLoadingMore
                ? 'Loading...'
                : isReachingEnd
                ? 'No more items'
                : 'Load more'}
            </Button>
          )}
        </Grid>
      </Grid>
    </>
  );
}
