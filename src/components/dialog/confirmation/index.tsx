import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type ConfirmationDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  isConfirming: boolean;
  onConfirm?: () => void;
  title?: string;
  description?: string;
};

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { open, setOpen, isConfirming, onConfirm, title, description } = props;

  return (
    <Dialog
      open={open}
      onClose={setOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title ?? 'Confirmation Dialog'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {description ??
            'Are you sure you want to do this? This action is irreversible.'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button disabled={isConfirming} onClick={onConfirm} autoFocus>
          {isConfirming ? 'Confirming' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
