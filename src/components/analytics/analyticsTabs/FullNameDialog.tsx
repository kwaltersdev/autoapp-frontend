// material-ui
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  dialog: {
    padding: 10,
  },
});

interface FullNameDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: () => void;
};
export default function FullNameDialog(props: FullNameDialogProps): React.ReactElement {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Paper className={classes.dialog}>
        <Typography variant='subtitle1'>{selectedValue}</Typography>
      </Paper>
    </Dialog>
  );
}