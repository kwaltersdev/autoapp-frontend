// react
import { useState, useEffect } from 'react';
// material-ui
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
// THIS PROJECT
// components
import { ContentPaper } from '../../../common/cardContent';
import TabContent from '../TabContent';
import EditInfo from './EditInfo';
import ReadonlyInfo from './ReadonlyInfo';
// types
import { VehicleDetailState } from '../../../../types/Vehicle';

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
    width: 'clamp(200px, 100%, 300px)',
  },
}));

interface InfoTabProps {
  vehicleDetailState: VehicleDetailState;
};
export default function InfoTab(props: InfoTabProps): React.ReactElement {
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
          ? vehicle && <EditInfo
            vehicleDetailsMounted={mounted}
            vehicle={vehicle}
            setVehicle={setVehicle}
            setEdit={setEdit}
            inputFieldStyle={classes.inputField}
          />
          : vehicle && <ReadonlyInfo vehicle={vehicle} inputFieldStyle={classes.inputField} />}
      </TabContent>
    </ContentPaper>
  );
}