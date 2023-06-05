import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { Item } from '../../../libs/types/item';

import CreateItemBidDialogForm from './form';

type CreateItemBidDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  item: Item;
};

export default function CreateItemBidDialog(props: CreateItemBidDialogProps) {
  const { open, setOpen, onSuccess, item } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = () => {
    if (onSuccess) onSuccess();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'Bid Item'}</DialogTitle>
      <CreateItemBidDialogForm
        handleClose={handleClose}
        onSuccess={handleSuccess}
        item={item}
      />
    </Dialog>
  );
}
