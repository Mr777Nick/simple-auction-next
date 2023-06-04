import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { enqueueSnackbar } from 'notistack';

import { Item } from '../../../libs/types/item';

import CreateUpdateItemDialogForm from './form';

type CreateUpdateItemDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  isEdit?: boolean;
  item?: Item;
};

export default function CreateUpdateItemDialog(
  props: CreateUpdateItemDialogProps,
) {
  const { open, setOpen, onSuccess, isEdit, item } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEdit ? 'Update Item' : 'Create Item'}</DialogTitle>
      <CreateUpdateItemDialogForm
        handleClose={handleClose}
        onSuccess={handleSuccess}
        isEdit={isEdit}
        item={item}
      />
    </Dialog>
  );
}
