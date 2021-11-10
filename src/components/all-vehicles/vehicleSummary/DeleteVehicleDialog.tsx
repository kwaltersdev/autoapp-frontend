// react
import { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
// THIS PROJECT
// components
import { FlexCenter } from '../../common/flex';
import VehicleInfo from '../../common/vehicles/VehicleInfo';
// hooks
import { useCheckMounted } from '../../../hooks';
// contexts
import { useDemoContext } from '../../../contexts/DemoContext';
// services
import { deleteVehicle as deleteVehicleService } from '../../../services/vehicles';
// types
import { DetailedVehicle } from '../../../types/Vehicle';
import { PostRequestStatus } from '../../../types/ServiceRequests';

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.titleColor.darkBlue,
  },
  dialog: {
    padding: 10,
    textAlign: 'center',
    maxWidth: 500,
  },
}));

export interface DeleteVehicleDialogProps {
  open: boolean;
  onClose: () => void;
  vehicle: DetailedVehicle;
  getVehicles: () => void;
};
export default function DeleteVehicleDialog(props: DeleteVehicleDialogProps): React.ReactElement {
  const classes = useStyles();
  const mounted = useCheckMounted();
  const { delay } = useDemoContext();
  const { onClose, open, vehicle, getVehicles } = props;
  const { id } = vehicle;

  const [deleteVehicleStatus, setDeleteVehicleStatus] = useState<PostRequestStatus>('');

  const deleteVehicle = async () => {
    setDeleteVehicleStatus('loading');
    await delay();
    deleteVehicleService(id)
      .then(result => {
        mounted.current && setDeleteVehicleStatus(result.status as PostRequestStatus);
        getVehicles();
      }, e => {
        mounted.current && setDeleteVehicleStatus('failed');
        console.error(e);
      });
  };

  // CLOSE DIALOG WHEN SUCCESSFULLY DELETED
  useEffect(() => {
    if (deleteVehicleStatus === 'success') onClose();
  }, [onClose, deleteVehicleStatus]);

  let buttons: JSX.Element;

  if (deleteVehicleStatus === 'loading') {
    buttons = (
      <CircularProgress />
    );
  } else if (deleteVehicleStatus === 'failed') {
    buttons = (
      <>
        <p>Failed to delete vehicle</p>
        <ButtonGroup>
          <Button onClick={onClose} >cancel</Button>
          <Button
            variant='outlined'
            color='secondary'
            onClick={deleteVehicle}
          >
            try again
          </Button>
        </ButtonGroup>
      </>
    );
  } else {
    buttons = (
      <ButtonGroup>
        <Button onClick={onClose} >cancel</Button>
        <Button
          variant='outlined'
          color='secondary'
          onClick={deleteVehicle}
        >
          yes, delete
        </Button>
      </ButtonGroup>
    );
  };

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="delete-vehicle-dialog"
      open={open}
      disableEscapeKeyDown>
      <div className={classes.dialog}>
        <DialogTitle id="add-vehicle-dialog" className={classes.title}>Delete Permanently?</DialogTitle>
        <FlexCenter>
          <VehicleInfo vehicle={vehicle} variant='subtitle1' />
        </FlexCenter>
        <br></br>
        <Divider />
        <br></br>
        {buttons}
      </div>
    </Dialog >
  );
}