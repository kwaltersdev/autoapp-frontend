// material-ui
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
// THIS PROJECT
// components
import { FlexSpaceBtwn } from '../../../common/flex';
// services
import { updateVehicle } from '../../../../services/vehicles';
// contexts 
import { useDemoContext } from '../../../../contexts/DemoContext';
// types
import { EditNotesState } from '../../../../types/Vehicle';
import { Set } from '../../../../types/misc';

interface EditNotesButtonsProps {
  editNotesState: EditNotesState;
  setEdit: Set<boolean>;
  className?: string;
};
export default function EditNotesButtons(props: EditNotesButtonsProps): React.ReactElement {
  const { editNotesState, setEdit, className } = props;
  const { delay } = useDemoContext();

  const {
    vehicleDetailsMounted,
    mounted,
    vehicleId,
    notes,
    editNotes,
    editNotesStatus, setEditNotesStatus,
    setVehicle
  } = editNotesState;

  const updateNotes = async () => {
    setEditNotesStatus('loading');
    await delay();
    const updateVehicleDoc = { notes: editNotes };
    updateVehicle(vehicleId, updateVehicleDoc)
      .then(result => {
        mounted.current && setEditNotesStatus(result.status);
        if (result.status === 'success') {
          vehicleDetailsMounted.current && setVehicle(result.doc);
          mounted && setEdit(false);
        };
        result.status === 'failed' && console.error(result);
      }, e => {
        mounted.current && setEditNotesStatus('failed');
        console.error(e);
      });
  };

  const cancelClick = () => setEdit(false);

  let updateButton: JSX.Element;

  const enabledUpdateButton = (
    <Button variant='contained' color='primary' onClick={updateNotes}>
      Update
    </Button>
  );

  const disabledUpdateButton = (
    <Button variant='contained' color='primary' disabled>
      Update
    </Button>
  );

  editNotesStatus === 'loading'
    ? updateButton = <CircularProgress size={25} />
    : notes !== editNotes
      ? updateButton = enabledUpdateButton
      : updateButton = disabledUpdateButton;

  return (
    <FlexSpaceBtwn className={className ? className : ''}>
      <Button variant='contained' onClick={cancelClick}>Cancel</Button>
      {updateButton}
    </FlexSpaceBtwn>
  );
}