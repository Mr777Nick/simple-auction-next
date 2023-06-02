import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';

import { Item } from '../../libs/types/item';

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
  isCompleted: boolean;
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
    isCompleted,
  } = props;

  return (
    <Grid container component="main">
      <Grid container item xs={12} justifyContent={'space-between'}>
        <Typography variant="h5">{title}</Typography>
        <Button disabled={isRefreshing} onClick={() => mutate()}>
          {isRefreshing ? 'refreshing...' : 'refresh'}
        </Button>
      </Grid>
      <Grid container item xs={12}>
        <ItemListHeader isCompleted={isCompleted} />
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
                  <ItemListItem item={item} isCompleted={isCompleted} />
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
  );
}
