// react
import { useState } from 'react';
// material-ui
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
// THIS PROJECT
// services
import { assignStage } from '../../../../services/stages';
// context
import { useDemoContext } from '../../../../contexts/DemoContext';
// hooks
import { useCheckMounted } from '../../../../hooks';
// types
import { IdName } from '../../../../types/misc';
import { VehicleDetailState } from '../../../../types/Vehicle';
import { PostRequestStatus } from '../../../../types/ServiceRequests';

interface AssignStageButtonProps {
  vehicleDetailState: VehicleDetailState;
  assignStageState: {
    stage: IdName;
    personPlace: IdName;
    taskList: string[];
  };
};
export default function AssignStageButton(props: AssignStageButtonProps): React.ReactElement {
  const mounted = useCheckMounted();
  const { delay } = useDemoContext();
  const { vehicleDetailState, assignStageState } = props;
  const { stage, personPlace, taskList } = assignStageState;
  const { mounted: pMounted, vehicle, setVehicle } = vehicleDetailState;
  const vehicleId = vehicle?.id;
  const previousStage = vehicle?.currentStage;
  const dateOnLot = vehicle?.dateOnLot;

  const [assignStageStatus, setAssignStageStatus] = useState<PostRequestStatus>('');

  const assignStageClick = async () => {
    setAssignStageStatus('loading');
    await delay();
    vehicleId && previousStage && assignStage({
      vehicleId,
      stage,
      personPlace,
      tasks: taskList,
      dateAssigned: Date.now(),
      dateOnLot
    }, previousStage).then(result => {
      mounted.current && setAssignStageStatus(result.status);
      result.status === 'success' && pMounted.current && setVehicle(result.doc);
      result.status === 'failed' && console.error(result);
    }, e => {
      mounted.current && setAssignStageStatus('failed');
      console.error(e);
    });
  };

  const assignButton = (
    <Button onClick={assignStageClick} variant='contained' color='primary' disableElevation>Assign Now</Button>
  );

  const disabledAssignButton = (
    <Button variant='contained' color='primary' disableElevation disabled>Assign Now</Button>
  );

  return (
    <FormControl>
      {assignStageStatus === 'loading'
        ? <CircularProgress size={50} />
        : vehicleId && stage.name && personPlace.name
          ? assignButton
          : disabledAssignButton}
    </FormControl>
  );
}