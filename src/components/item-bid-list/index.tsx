import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';

import theme from '../../config/theme';
import { ItemBid } from '../../libs/types/item-bid';

import ItemBidListHeader from './item-bid-list-header';
import ItemBidListItem from './item-bid-list-item/item-list-item';

type ItemBidListProps = {
  title: string;
  isRefreshing: boolean | undefined;
  isEmpty: boolean;
  isLoadingMore: boolean | undefined;
  isReachingEnd: boolean | undefined;
  size: number;
  mutate: () => void;
  setSize: (size: number) => void;
  data: ItemBid[][] | undefined;
};

export default function ItemBidList(props: ItemBidListProps) {
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
  } = props;

  return (
    <>
      <Grid container component="main">
        <Grid container item xs={12} justifyContent={'space-between'}>
          <Grid container item xs={'auto'}>
            <Typography variant="h5" marginRight={theme.spacing(1)}>
              {title}
            </Typography>
          </Grid>
          <Grid item>
            <Button disabled={isRefreshing} onClick={() => mutate()}>
              {isRefreshing ? 'refreshing...' : 'refresh'}
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <ItemBidListHeader />
        </Grid>
        <Grid item xs={12}>
          <Divider flexItem />
        </Grid>
        <Grid container item xs={12}>
          {data &&
            data.map((itemBids) => {
              return itemBids.map((itemBid) => {
                return (
                  <Fragment key={itemBid.id}>
                    <ItemBidListItem
                      itemBid={itemBid}
                      onSuccessAction={mutate}
                    />
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
