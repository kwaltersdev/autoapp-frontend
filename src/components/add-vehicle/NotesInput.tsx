// react
import { useState, useEffect } from 'react';
// material-ui
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import Collapse from '@mui/material/Collapse';
import TextField from '@mui/material/TextField';
import { ClassNameMap } from '@mui/styles';
// THIS PROJECT
// types
import { AddVehicleState } from '../../types/Vehicle';

interface NotesInputProps {
  mounted: React.MutableRefObject<boolean>;
  addVehicleState: AddVehicleState;
  classes: ClassNameMap<"form" | "inputField">;
};
export default function NotesInput(props: NotesInputProps): React.ReactElement {
  const { classes, addVehicleState } = props;
  const { notes, setNotes, addVehicleStatus } = addVehicleState;
  const [showNotesInput, setShowNotesInput] = useState<boolean>(false);

  const toggleShowNotesInput = () => {
    showNotesInput && setShowNotesInput(false);
    !showNotesInput && setShowNotesInput(true);
  };

  const handleNotesChange = (e: React.ChangeEvent<{ value: string; }>) => {
    setNotes(e.target.value);
  };

  useEffect(() => {
    addVehicleStatus && setShowNotesInput(false);
  }, [addVehicleStatus]);

  return (
    <>
      <Button
        className={classes.inputField}
        startIcon={!showNotesInput ? <EditIcon /> : <RemoveIcon />}
        onClick={toggleShowNotesInput}
      >
        Notes
      </Button>
      <Collapse in={showNotesInput} timeout='auto' style={{ width: '100%' }}>
        <div className={classes.form}>
          <TextField
            className={classes.inputField}
            multiline
            maxRows={4}
            variant='outlined'
            label='Notes'
            value={notes}
            onChange={handleNotesChange}
          />
        </div>
      </Collapse>

    </>
  );
}