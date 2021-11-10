// react-router-dom
import { useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// THIS PROJECT
// types
import { AddVehicleState } from '../../types/Vehicle';

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.titleColor.darkBlue,
  },
  dialog: {
    padding: 10,
    textAlign: 'center',
    maxWidth: 500,
  },
  button: {
    width: 120,
    margin: 5,
  },
}));

interface AddVehicleFailureDialogProps {
  open: boolean;
  addVehicleClick: () => void;
  addVehicleState: AddVehicleState;
};
export default function AddVehicleFailureDialog(props: AddVehicleFailureDialogProps): React.ReactElement {
  const classes = useStyles();
  const history = useHistory();
  const { open, addVehicleClick, addVehicleState } = props;
  const { setAddVehicleStatus } = addVehicleState;

  const handleDoneClick = () => {
    setAddVehicleStatus('');
    history.push('/all-vehicles/active/asc/10/first/0');
  };

  return (
    <Dialog aria-labelledby="add-vehicle-dialog" open={open}>
      <div className={classes.dialog}>
        <DialogTitle id="add-vehicle-dialog" className={classes.title}>Failed to Add Vehicle</DialogTitle>
        <br></br>
        <Divider />
        <Typography variant="subtitle1">What next?</Typography>
        <Button className={classes.button} onClick={handleDoneClick} variant='outlined' size='small'>CANCEL</Button>
        <Button className={classes.button} onClick={addVehicleClick} variant='outlined' size='small'>TRY AGAIN</Button>
      </div>
    </Dialog >
  );
}