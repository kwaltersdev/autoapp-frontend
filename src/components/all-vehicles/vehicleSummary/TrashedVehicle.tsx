// react
import { useState } from 'react';
// material-ui;
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Divider from '@mui/material/Divider';
import { CircularProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
// THIS PROJECT
// components
import VehicleListItem from '../../common/vehicles/VehicleListItem';
import VehicleInfo from '../../common/vehicles/VehicleInfo';
import VehicleChipGroup from '../../common/vehicles/VehicleChipGroup';
import DeleteVehicleDialog from './DeleteVehicleDialog';
// hooks
import { useCheckMounted } from '../../../hooks';
// contexts
import { useDemoContext } from '../../../contexts/DemoContext';
// services
import { updateVehicle } from '../../../services/vehicles';
// types
import { DetailedVehicle } from '../../../types/Vehicle';
import { PostRequestStatus } from '../../../types/ServiceRequests';

const useStyles = makeStyles(theme => ({
  trashButtons: {
    margin: theme.spacing(.25),
    width: '100%',
  },
}));

interface TrashedVehicleProps {
  vehicle: DetailedVehicle;
  getVehicles: () => void;
  className?: string;
};
export default function TrashedVehicle(props: TrashedVehicleProps): React.ReactElement {
  const classes = useStyles();
  const mounted = useCheckMounted();
  const { delay } = useDemoContext();
  const { vehicle, getVehicles, className } = props;

  const [updateVehicleStatus, setUpdateVehicleStatus] = useState<PostRequestStatus>('');

  // Activate vehicle
  const activateVehicle = async () => {
    setUpdateVehicleStatus('loading');
    await delay();
    updateVehicle(vehicle.id, { 'status': 'active' })
      .then(result => {
        mounted.current && setUpdateVehicleStatus(result.status as PostRequestStatus);
        getVehicles();
      }, e => {
        mounted.current && setUpdateVehicleStatus('failed');
        console.error(e);
      });
  };

  // Delete vehicle
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const toggleDeleteDialog = () =>
    openDeleteDialog ? setOpenDeleteDialog(false) : setOpenDeleteDialog(true);

  return (
    <>
      <VehicleListItem className={className ? className : ''}>
        <VehicleInfo vehicle={vehicle} listItem />
        <VehicleChipGroup>
          {updateVehicleStatus === 'loading'
            ? <CircularProgress size={25} />
            : <>
              <Button
                className={classes.trashButtons}
                size='small'
                variant='outlined'
                color='primary'
                onClick={activateVehicle}
              >
                Activate
              </Button>
              <Button className={classes.trashButtons}
                size='small'
                variant='outlined'
                color='secondary'
                startIcon={<DeleteForeverIcon />}
                onClick={toggleDeleteDialog}
              >
                Delete
              </Button>
              <DeleteVehicleDialog
                open={openDeleteDialog}
                onClose={toggleDeleteDialog}
                vehicle={vehicle}
                getVehicles={getVehicles}
              />
            </>
          }
        </VehicleChipGroup>
      </VehicleListItem>
      <Divider />
    </>
  );
}