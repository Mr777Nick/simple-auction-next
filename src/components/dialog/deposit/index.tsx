import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DepositForm from '../../deposit/form';

type DepositDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  amount?: number;
};

export default function DepositDialog(props: DepositDialogProps) {
  const { open, setOpen, amount } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={setOpen}>
      <DialogTitle>{'Deposit'}</DialogTitle>
      <DialogContent>
        <DialogContentText>{`Your current balance is not enough to do the bid with that amount. Please deposit a minimum of $ ${amount} to continue.`}</DialogContentText>
        <DepositForm amount={amount} isForDialog handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
