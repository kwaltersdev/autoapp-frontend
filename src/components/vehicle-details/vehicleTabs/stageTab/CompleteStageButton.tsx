// react
import { useState } from 'react';
// material-ui
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// THIS PROJECT
// components
import CenteredError from '../../../common/CenteredError';
// hooks
import { useCheckMounted } from '../../../../hooks';
// services
import { completeStageAssignment } from '../../../../services/stages';
// contexts
import { useDemoContext } from '../../../../contexts/DemoContext';
// types
import { VehicleDetailState } from '../../../../types/Vehicle';
import { PostRequestStatus } from '../../../../types/ServiceRequests';

interface CompleteStageButtonProps {
  vehicleDetailState: VehicleDetailState;
}
export default function CompleteStageButton(props: CompleteStageButtonProps): React.ReactElement {
  const mounted = useCheckMounted();
  const { delay } = useDemoContext();
  const { vehicleDetailState } = props;
  const { mounted: pMounted, vehicle, setVehicle } = vehicleDetailState;
  const stageAssignmentId = vehicle?.currentStage.id;

  const [completeStageStatus, setCompleteStageStatus] = useState<PostRequestStatus>('');

  const completeStageClick = async () => {
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

  if (completeStageStatus === 'failed') {
    return <CenteredError errorMessage='Failed to complete stage' retryAction={completeStageClick} />;
  };

  return (
    <Box m={1}>
      {completeStageStatus === 'loading'
        ? <CircularProgress size={50} />
        : stageAssignmentId
        && <Button onClick={completeStageClick} variant='contained' color='primary' disableElevation>Complete</Button>}
    </Box>
  );
}