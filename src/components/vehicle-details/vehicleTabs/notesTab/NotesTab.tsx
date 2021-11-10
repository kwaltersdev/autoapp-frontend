// react
import { useState, useEffect } from 'react';
// material-ui
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
// THIS PROJECT
// components
import TabContent from '../TabContent';
import EditNotes from './EditNotes';
import ReadonlyNotes from './ReadonlyNotes';
// types
import { VehicleDetailState } from '../../../../types/Vehicle';
import { ContentPaper } from '../../../common/cardContent';

const useStyles = makeStyles((theme: Theme) => ({
  editButtonDiv: {
    width: '100%',
    marginTop: -25,
    marginBottom: -10,
  },
  editButton: {
    float: 'right',
  },
  inputField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    margin: 'auto',
    width: 'clamp(200px, 100%, 400px)',
  },
}));

interface NotesTabProps {
  vehicleDetailState: VehicleDetailState;
}
export default function NotesTab(props: NotesTabProps): React.ReactElement {
  const classes = useStyles();
  const { vehicleDetailState } = props;
  const { mounted, vehicle, setVehicle, setDisableDoneButton } = vehicleDetailState;
  const [edit, setEdit] = useState<boolean>(false);

  const handleEditClick = () => {
    edit ? setEdit(false) : setEdit(true);
  };

  useEffect(() => {
    edit ? setDisableDoneButton(true) : setDisableDoneButton(false);
    return () => setDisableDoneButton(false);
  }, [edit, setDisableDoneButton]);

  return (
    <ContentPaper>
      <TabContent>
        <div className={classes.editButtonDiv} >
          <IconButton
            aria-label='edit'
            className={classes.editButton}
            onClick={handleEditClick}
            color={edit ? 'primary' : 'inherit'}
            size="large">
            <EditIcon />
          </IconButton>
        </div>
        {edit
          ? vehicle && <EditNotes
            vehicleDetailsMounted={mounted}
            vehicle={vehicle}
            setVehicle={setVehicle}
            setEdit={setEdit}
            inputFieldStyle={classes.inputField}
          />
          : vehicle && <ReadonlyNotes vehicle={vehicle} inputFieldStyle={classes.inputField} />}
      </TabContent>
    </ContentPaper>
  );
}