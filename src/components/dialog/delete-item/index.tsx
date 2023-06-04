import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import useSWRMutation from 'swr/mutation';

import { backendRoutes } from '../../../libs/api/backend/routes';
import {
  DeleteItemBackendCall,
  deleteItemBackendCall,
} from '../../../libs/api/backend-apis/items';
import { useAuthContext } from '../../../libs/context/auth';
import { BackendCallURL } from '../../../libs/types/backend-call';
import { BackendResponse } from '../../../libs/types/backend-response';
import { Item } from '../../../libs/types/item';
import ConfirmationDialog from '../confirmation';

type DeleteItemDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  item: Item;
  title?: string;
  description?: string;
};

export default function DeleteItemDialog(props: DeleteItemDialogProps) {
  const { open, setOpen, onSuccess, item, title, description } = props;

  const { tokenInfo } = useAuthContext();

  const { trigger, data, error, isMutating } = useSWRMutation<
    BackendResponse<null>,
    Error,
    BackendCallURL,
    DeleteItemBackendCall
  >(backendRoutes.items.all, deleteItemBackendCall);

  const handleConfirm = async () => {
    try {
      await trigger({ id: item.id, token: tokenInfo?.access_token });
    } catch (error) {}
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    if (data && !error && !isMutating) {
      handleClose();
      enqueueSnackbar('Item deleted successfully', { variant: 'success' });
      if (onSuccess) onSuccess();
    }
  }, [data, error, handleClose, isMutating, onSuccess]);

  useEffect(() => {
    if (error) {
      enqueueSnackbar('An error occurred. Please try again.', {
        variant: 'error',
      });
    }
  }, [error]);

  return (
    <ConfirmationDialog
      open={open}
      setOpen={setOpen}
      isConfirming={isMutating}
      onConfirm={handleConfirm}
      title={title}
      description={description}
    />
  );
}
