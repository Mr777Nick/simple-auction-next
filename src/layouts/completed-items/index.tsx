import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import useSWRInfinite from 'swr/infinite';

import ItemList from '../../components/item-list';
import { backendRoutes } from '../../libs/api/backend/routes';
import { getItems } from '../../libs/api/backend-apis/items';
import { useAuthContext } from '../../libs/context/auth';
import { Item } from '../../libs/types/item';

const PAGE_SIZE = 5;

export default function CompletedItemsLayout() {
  const { tokenInfo } = useAuthContext();

  const getCompletedItemsKey = (pageIndex: number, previousPageData: any[]) => {
    if (previousPageData && !previousPageData.length) return null;

    return `${backendRoutes.items.completed}?page=${
      pageIndex + 1
    }&take=${PAGE_SIZE}`;
  };

  const { data, mutate, size, setSize, isValidating, isLoading, error } =
    useSWRInfinite<
      Item[],
      Error,
      (pageIndex: number, previousPageData: any[]) => string | null
    >(getCompletedItemsKey, (url) =>
      getItems(url, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
        },
      }),
    );

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
  const isRefreshing = isValidating && data && data.length === size;

  useEffect(() => {
    if (error) {
      enqueueSnackbar((error as Error).message, { variant: 'error' });
    }
  }, [error]);

  return (
    <ItemList
      title={'Completed Items'}
      isRefreshing={isRefreshing}
      isEmpty={isEmpty}
      isLoadingMore={isLoadingMore}
      isReachingEnd={isReachingEnd}
      size={size}
      mutate={mutate}
      setSize={setSize}
      data={data}
      variant={'completed'}
    />
  );
}
