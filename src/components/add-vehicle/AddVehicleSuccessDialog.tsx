// react-router-dom
import { useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// THIS PROJECT
// components
import VehicleInfo from '../common/vehicles/VehicleInfo';
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

interface AddVehicleSuccessDialogProps {
  open: boolean;
  addVehicleState: AddVehicleState;
};
export default function AddVehicleSuccessDialog(props: AddVehicleSuccessDialogProps): React.ReactElement {
  const classes = useStyles();
  const history = useHistory();
  const { open, addVehicleState } = props;
  const { setAddVehicleStatus, addedVehicle } = addVehicleState;

  const handleAnotherClick = () => {
    setAddVehicleStatus('');
    history.push('/add-vehicle');
  };

  const handleDoneClick = () => {
    setAddVehicleStatus('');
    history.push('/all-vehicles/active/asc/10/first/0');
  };

  return (
    <Dialog aria-labelledby="add-vehicle-dialog" open={open} disableEscapeKeyDown>
      <div className={classes.dialog}>
        <DialogTitle id="add-vehicle-dialog" className={classes.title}>Successfully Added:</DialogTitle>
        {addedVehicle ? <VehicleInfo vehicle={addedVehicle} variant='subtitle1' /> : <></>}
        <br></br>
        <Divider />
        <Typography variant="subtitle1">What next?</Typography>
        <Button onClick={handleAnotherClick} className={classes.button} color='primary' startIcon={<AddIcon />} variant='outlined' size='small'>ANOTHER</Button>
        <Button onClick={handleDoneClick} className={classes.button} color='primary' variant='outlined' size='small'>DONE</Button>
      </div>
    </Dialog >
  );
}