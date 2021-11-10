// material-ui
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  dialog: {
    margin: 'auto',
  },
  dialogContent: {
    width: '80vw',
    maxWidth: 400,
    maxHeight: '90vh',
  },
}));

interface SelectDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  children: JSX.Element;
  flex?: boolean;
};
export default function SelectDialog(props: SelectDialogProps): React.ReactElement {
  const classes = useStyles();

  const { open, setOpen, children, flex } = props;

  return (
    <Dialog className={classes.dialog} open={open} onClose={() => setOpen(false)}>
      <DialogContent className={classes.dialogContent}
        style={flex ? { display: 'flex', justifyContent: 'center', alignItems: 'center' } : {}}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};
