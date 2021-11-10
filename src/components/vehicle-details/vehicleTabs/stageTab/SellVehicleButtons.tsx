// react
import { useState } from 'react';
// material-ui
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// THIS PROJECT
// hooks
import { useCheckMounted } from '../../../../hooks';
// services
import { sellVehicle } from '../../../../services/vehicles';
import { completeStageAssignment } from '../../../../services/stages';
// contexts
import { useDemoContext } from '../../../../contexts/DemoContext';
// types
import { VehicleDetailState } from '../../../../types/Vehicle';
import { PostRequestStatus } from '../../../../types/ServiceRequests';
import CenteredError from '../../../common/CenteredError';

const useStyles = makeStyles((theme) => ({
  sellButton: {
    width: 125,
    backgroundColor: theme.palette.success.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.success.dark,
    },
  },
  reassignButton: {
    width: 125,
  },
}));

interface SellVehicleButtonsProps {
  vehicleDetailState: VehicleDetailState;
};
export default function SellVehicleButtons(props: SellVehicleButtonsProps): React.ReactElement {
  const mounted = useCheckMounted();
  const classes = useStyles();
  const { delay } = useDemoContext();
  const { vehicleDetailState } = props;
  const { mounted: pMounted, vehicle, setVehicle } = vehicleDetailState;
  const stageAssignmentId = vehicle?.currentStage.id;

  const [sellVehicleStatus, setSellVehicleStatus] = useState<PostRequestStatus>('');
  const [completeStageStatus, setCompleteStageStatus] = useState<PostRequestStatus>('');

  const reassignClick = async () => {
    setCompleteStageStatus('loading');
    await delay();
    stageAssignmentId && completeStageAssignment(stageAssignmentId, Date.now())
      .then(result => {
        mounted.current && setCompleteStageStatus(result.status);
        if (result.status === 'success') {
          pMounted && result.data && setVehicle(result.data);
        }
        if (result.status === 'failed') {
          console.error(result);
        }
      }, e => {
        mounted.current && setCompleteStageStatus('failed');
        console.error(e);
      });
  };

  const sellVehicleClick = async () => {
    setSellVehicleStatus('loading');
    await delay();
    vehicle && sellVehicle(vehicle.id, vehicle.currentStage.id, Date.now())
      .then(result => {
        mounted.current && setSellVehicleStatus(result.status as PostRequestStatus);
        result.status === 'success' && pMounted.current && setVehicle(result.doc);
        result.status === 'failed' && console.error(result);
      }, e => {
        mounted.current && setSellVehicleStatus('failed');
        console.error(e);
      });
  };

  if (completeStageStatus === 'failed') {
    return <CenteredError errorMessage='Failed to re-assign vehicle' retryAction={reassignClick} />;
  };

  if (sellVehicleStatus === 'failed') {
    return <CenteredError errorMessage='Failed to sell vehicle' retryAction={sellVehicleClick} />;
  };

  return (
    <Box m={1}>
      {sellVehicleStatus === 'loading' || completeStageStatus === 'loading'
        ? <CircularProgress size={50} />
        : stageAssignmentId
        && <ButtonGroup>
          <Button
            className={classes.reassignButton}
            onClick={reassignClick}
            variant='outlined'
          >
            re-assign
          </Button>
          <Button
            className={classes.sellButton}
            startIcon={<AttachMoneyIcon />}
            onClick={sellVehicleClick}
            variant='contained'
            disableElevation
          >
            Sell
          </Button>
        </ButtonGroup>}
    </Box>
  );
}