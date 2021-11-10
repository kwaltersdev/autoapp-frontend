// react
import { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
// THIS PROJECT
// components
import StageSelect from '../../../common/stages/StageSelect';
import PersonPlaceSelect from '../../../common/stages/PersonPlaceSelect';
import TaskListInput from '../../../common/stages/TaskListInput';
import AssignStageButton from './AssignStageButton';
// hooks
import { useCheckMounted } from '../../../../hooks';
// types
import { IdName } from '../../../../types/misc';
import { VehicleDetailState } from '../../../../types/Vehicle';

const useStyles = makeStyles((theme) => ({
  inputField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    margin: 'auto',
    width: 'clamp(200px, 100%, 300px)',
  },
}));

interface AssignStageProps {
  vehicleDetailState: VehicleDetailState;
};
export default function AssignStage(props: AssignStageProps): React.ReactElement {
  const mounted = useCheckMounted();
  const classes = useStyles();
  const { vehicleDetailState } = props;

  const [stage, setStage] = useState<IdName>({ id: '', name: '' });
  const [personPlace, setPersonPlace] = useState<IdName>({ id: '', name: '' });
  const [taskList, setTaskList] = useState<string[]>([]);
  const assignStageState = { stage, personPlace, taskList };

  // automatically assigning the default stage assignment when leaving page without having assigned stage
  // is handled in the parent VehicleDetails.tsx

  return (
    <>
      <StageSelect
        className={classes.inputField}
        parent={{ mounted, stage, setStage }}
        allowAddStage
      />
      <PersonPlaceSelect
        className={classes.inputField}
        parent={{ mounted, stage, personPlace, setPersonPlace }}
        allowAddPersonPlace
      />
      <TaskListInput
        className={classes.inputField}
        taskList={taskList}
        setTaskList={setTaskList}
      />
      <br></br>
      <AssignStageButton
        vehicleDetailState={vehicleDetailState}
        assignStageState={assignStageState}
      />
    </>
  );
}