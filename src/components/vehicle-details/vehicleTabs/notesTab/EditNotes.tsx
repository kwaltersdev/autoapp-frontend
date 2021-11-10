// react
import { useState } from 'react';
// material-ui
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
// THIS PROJECT
// components
import EditNotesButtons from './EditNotesButtons';
import CenteredError from '../../../common/CenteredError';
// hooks
import { useCheckMounted } from "../../../../hooks";
// types
import { PostRequestStatus } from '../../../../types/ServiceRequests';
import { Set } from "../../../../types/misc";
import { DetailedVehicle, EditNotesState } from "../../../../types/Vehicle";

interface EditNotesProps {
  vehicleDetailsMounted: React.MutableRefObject<boolean>;
  vehicle: DetailedVehicle;
  setVehicle: Set<DetailedVehicle | null>;
  setEdit: Set<boolean>;
  inputFieldStyle?: string;
};
export default function EditNotes(props: EditNotesProps): React.ReactElement {
  const mounted = useCheckMounted();
  const { vehicleDetailsMounted, vehicle, setVehicle, setEdit, inputFieldStyle } = props;
  const { id, notes } = vehicle;

  const [editNotes, setEditNotes] = useState<string>(notes);
  const [editNotesStatus, setEditNotesStatus] = useState<PostRequestStatus>('');

  const editNotesState: EditNotesState = {
    vehicleDetailsMounted,
    mounted,
    vehicleId: id,
    notes,
    editNotes,
    editNotesStatus,
    setEditNotesStatus,
    setVehicle
  };

  const handleNotesChange = (e: React.ChangeEvent<{ value: unknown; }>): void => {
    setEditNotes(e.target.value as string);
  };

  if (editNotesStatus === 'failed') {
    return <CenteredError errorMessage='Failed to update vehicle notes' />;
  };

  return <>
    <FormControl className={inputFieldStyle}>
      <TextField
        onChange={handleNotesChange}
        label='Notes'
        value={editNotes}
        variant='outlined'
        multiline
        maxRows={5}
        autoFocus
      />
    </FormControl>
    <EditNotesButtons className={inputFieldStyle} editNotesState={editNotesState} setEdit={setEdit} />
  </>;
}