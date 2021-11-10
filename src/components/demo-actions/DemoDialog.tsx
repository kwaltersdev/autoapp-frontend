// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// THIS PROJECT
// components
import ActionList from './ActionList';
// services
import {
  clearDatabase as clearDatabaseService,
  addVehicleDescriptors as addVehicleDescriptorsService,
  addStages as addStagesService,
  generateVehicles as generateVehiclesService,
} from '../../services/demo';
// contexts
import { useAuthContext } from '../../contexts/AuthContext';
// types
import { DemoState } from '../../types/Demo';
import { Set } from '../../types/misc';
import { DeleteRequestStatus } from '../../types/ServiceRequests';

interface DemoDialogProps {
  demoState: DemoState;
  open: boolean;
  setOpen: Set<boolean>;
};
export default function DemoDialog(props: DemoDialogProps): React.ReactElement {
  const { getUserPreferences } = useAuthContext();
  const { demoState, open, setOpen } = props;

  const {
    mounted,
    setLoading,
    clearDatabase,
    setClearDatabaseStatus,
    addVehicleDescriptors,
    setAddVehicleDescriptorsStatus,
    addStages,
    setAddStagesStatus,
    generateVehicles,
    setGenerateVehiclesStatus,
    vehiclesAmount,
    months
  } = demoState;

  const clearDatabaseClick = async () => {
    if (!clearDatabase) { return; } else {
      setClearDatabaseStatus('loading');
      await clearDatabaseService()
        .then(result => {
          mounted.current && setClearDatabaseStatus(result.status as DeleteRequestStatus);
          result.status === 'failed' && console.error(result);
        }, e => {
          mounted.current && setClearDatabaseStatus('failed');
          console.error(e);
        });
      return;
    };
  };

  const addVehicleDescriptorsClick = async () => {
    if (!addVehicleDescriptors) { return; } else {
      setAddVehicleDescriptorsStatus('loading');
      await addVehicleDescriptorsService()
        .then(result => {
          mounted.current && setAddVehicleDescriptorsStatus(result.status);
          result.status === 'failed' && console.error(result);
        }, e => {
          mounted.current && setAddVehicleDescriptorsStatus('failed');
          console.error(e);
        });
    };
  };

  const addStagesClick = async () => {
    if (!addStages) { return; } else {
      setAddStagesStatus('loading');
      await addStagesService()
        .then(result => {
          mounted.current && setAddStagesStatus(result.status);
          result.status === 'failed' && console.error(result);
        }, e => {
          mounted.current && setAddStagesStatus('failed');
          console.error(e);
        });
    };
  };

  const generateVehiclesClick = async () => {
    if (!generateVehicles) { return; } else {
      setGenerateVehiclesStatus('loading');
      await generateVehiclesService(vehiclesAmount, months)
        .then(result => {
          mounted.current && setGenerateVehiclesStatus(result.status);
          result.status === 'failed' && console.error(result);
        }, e => {
          mounted.current && setGenerateVehiclesStatus('failed');
          console.error(e);
        });
    }
  };

  const continueClick = async () => {
    setLoading(true);
    await clearDatabaseClick();
    await Promise.all([
      addVehicleDescriptorsClick(),
      addStagesClick()
    ]);
    await generateVehiclesClick();
    setLoading(false);
    getUserPreferences();
  };

  return (
    <Dialog
      open={open}
      aria-labelledby='demo-dialog-title'
      aria-describedby='demo-dialog-description'
    >
      <DialogTitle id='demo-dialog-title'>Continue with the following <strong>PERMANENT</strong> action(s)?</DialogTitle>
      <DialogContent>
        <ActionList demoState={demoState} />
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={() => setOpen(false)}>
          go back
        </Button>
        <Button color='primary' onClick={continueClick}>
          continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}