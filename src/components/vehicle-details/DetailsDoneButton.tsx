// react-router-dom
import { useHistory } from 'react-router-dom';
// material-ui
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material';
// THIS PROJECT
// hooks
import { useQuery } from '../../hooks';
import { useAuthContext } from '../../contexts/AuthContext';
// services
import { assignStage } from '../../services/stages';
// contexts
import { useDemoContext } from '../../contexts/DemoContext';
// types
import { PostRequestStatus } from '../../types/ServiceRequests';
import { Set } from '../../types/misc';
import { DetailedVehicle } from '../../types/Vehicle';

const useStyles = makeStyles((theme: Theme) => ({
  buttonContainer: {
    width: '100%',
    textAlign: 'right',
  },
  button: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  }
}));

interface DetailsDoneButtonProps {
  disableDoneButton: boolean;
  mounted: React.MutableRefObject<boolean>;
  vehicle: DetailedVehicle | null;
  setUpdateVehicleStatus: Set<PostRequestStatus>;
};
export default function DetailsDoneButton(props: DetailsDoneButtonProps): React.ReactElement {
  const query = useQuery();
  const history = useHistory();
  const classes = useStyles();
  const { delay } = useDemoContext();
  const { disableDoneButton, mounted, vehicle, setUpdateVehicleStatus } = props;

  const { defaultStageAssignment } = useAuthContext().userPreferences;

  // if vehicle stage is complete, and a new stage has not been assigned, we need to assign the default
  // stage assignment when the done button is clicked
  const doneButtonClick = async () => {
    // check if we have a 'prev' query parameter,if we do set previous to the trimmed path, if not set it to ''
    const previous = query.get('prev')
      ? window.location.href.replace(/.*(?=prev=)(prev=)/, '')
      : '';
    const exit = () => {
      previous
        ? history.push(`${previous}`)
        : history.push(`/all-vehicles/active/asc/10/first/0`);
    };
    if (vehicle && vehicle.currentStage.status === 'complete' && vehicle.status !== 'sold') {
      setUpdateVehicleStatus('loading');
      await delay();
      assignStage({
        vehicleId: vehicle.id,
        stage: defaultStageAssignment.stage,
        personPlace: defaultStageAssignment.personPlace,
        tasks: [],
        dateAssigned: Date.now()
      }).then(result => {
        result.status === 'success' && exit();
        mounted.current && result.status === 'failed' && setUpdateVehicleStatus('failed');
      }, e => {
        mounted.current && setUpdateVehicleStatus('failed');
        console.error(e);
      });
    } else {
      exit();
    }
  };

  return (
    <div className={classes.buttonContainer}>
      {!disableDoneButton
        ? <Button
          onClick={doneButtonClick}
          className={classes.button}
          color='primary'
          variant='contained'
        >
          Done
        </Button>
        : <Button
          disabled
          className={classes.button}
          color='primary'
          variant='contained'
        >
          Done
        </Button>
      }
    </div>
  );
}