// react
import { useState, useEffect } from 'react';
// material-ui
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Collapse from '@mui/material/Collapse';
import { ClassNameMap } from '@mui/styles';
// THIS PROJECT
// components
import StageSelect from '../common/stages/StageSelect';
import PersonPlaceSelect from '../common/stages/PersonPlaceSelect';
import TaskListInput from '../common/stages/TaskListInput';
// types
import { AddVehicleState } from '../../types/Vehicle';

interface StageAssignInputsProps {
  mounted: React.MutableRefObject<boolean>;
  addVehicleState: AddVehicleState;
  classes: ClassNameMap<"form" | "inputField">;
};
export default function StageAssignInputs(props: StageAssignInputsProps): React.ReactElement {
  const { classes, addVehicleState, mounted } = props;
  const { stage, setStage, personPlace, setPersonPlace, taskList, setTaskList, addVehicleStatus } = addVehicleState;
  const [showStageInputs, setShowStageInputs] = useState<boolean>(false);

  const toggleShowStageInputs = () => {
    showStageInputs && setShowStageInputs(false);
    !showStageInputs && setShowStageInputs(true);
  };

  useEffect(() => {
    addVehicleStatus && setShowStageInputs(false);
  }, [addVehicleStatus]);

  return (
    <>
      <Button
        className={classes.inputField}
        startIcon={!showStageInputs ? <AddIcon /> : <RemoveIcon />}
        onClick={toggleShowStageInputs}
      >
        Stage Assignment
      </Button>
      <Collapse in={showStageInputs} timeout='auto' sx={{ width: '100%' }}>
        <div className={classes.form}>
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
        </div>
      </Collapse>
    </>
  );
}

