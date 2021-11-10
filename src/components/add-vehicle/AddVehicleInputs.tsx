// react
import { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import FormHelperText from '@mui/material/FormHelperText';
// THIS PROJECT
// components
import VehicleInfoInputs from './VehicleInfoInputs';
import StageAssignInputs from './StageAssignInputs';
import NotesInput from './NotesInput';
import AddVehicleButton from './AddVehicleButton';
import AddVehicleSuccessDialog from './AddVehicleSuccessDialog';
import AddVehicleFailureDialog from './AddVehicleFailureDialog';
import { FlexCenter } from '../common/flex';
// hooks
import { useCheckMounted } from '../../hooks';
// contexts
import { useAuthContext } from '../../contexts/AuthContext';
import { useDemoContext } from '../../contexts/DemoContext';
// services
import { checkStock, addVehicle } from '../../services/vehicles';
// types
import { DetailedVehicle, AddVehicleState, AddVehicleParam } from '../../types/Vehicle';
import { IdName } from '../../types/misc';
import { PostRequestStatus } from '../../types/ServiceRequests';
import { InitialStageParam } from '../../types/StageAssignment';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
    margin: 'auto',
    width: 'clamp(200px, 100%, 400px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  inputField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    margin: 'auto',
    width: 'clamp(200px, 100%, 300px)',
  },
}));

export default function AddVehicleInputs(): React.ReactElement {
  const classes = useStyles();
  const mounted = useCheckMounted();
  const { userPreferences } = useAuthContext();
  const { delay } = useDemoContext();
  const { defaultStageAssignment } = userPreferences;

  const [stock, setStock] = useState<string>('');
  const [stockOkay, setStockOkay] = useState<boolean>(true);
  const [stockError, setStockError] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [make, setMake] = useState<IdName>({ id: '', name: '' });
  const [model, setModel] = useState<IdName>({ id: '', name: '' });
  const [trim, setTrim] = useState<IdName>({ id: '', name: '' });
  const [stage, setStage] = useState<IdName>({ id: '', name: '' });
  const [personPlace, setPersonPlace] = useState<IdName>({ id: '', name: '' });
  const [taskList, setTaskList] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [addVehicleStatus, setAddVehicleStatus] = useState<PostRequestStatus>('');
  const [addedVehicle, setAddedVehicle] = useState<DetailedVehicle | null>(null);

  useEffect(() => {
    if (!stage.id) setStage(defaultStageAssignment.stage);
  }, [defaultStageAssignment, stage]);

  // set default stage assignment Person / Place on first render. Have to do it here, 
  // because personPlace resets when stage is set (PersonPlaceSelect.tsx)
  // causing it to go blank if we assign it when we initialize the personPlace state above
  useEffect(() => {
    if (stage === defaultStageAssignment.stage) {
      if (addVehicleStatus === '' || addVehicleStatus === 'success') {
        setPersonPlace(defaultStageAssignment.personPlace);
      }
    }
  }, [defaultStageAssignment, stage, addVehicleStatus]);

  const addVehicleState: AddVehicleState = {
    stock, setStock,
    stockOkay, setStockOkay,
    stockError, setStockError,
    year, setYear,
    make, setMake,
    model, setModel,
    trim, setTrim,
    stage, setStage,
    personPlace, setPersonPlace,
    taskList, setTaskList,
    notes, setNotes,
    addVehicleStatus, setAddVehicleStatus,
    addedVehicle, setAddedVehicle,
  };

  const clearInputs = () => {
    setStock('');
    setStockOkay(true);
    setStockError('');
    setYear('');
    setMake({ id: '', name: '' });
    setModel({ id: '', name: '' });
    setTrim({ id: '', name: '' });
    setStage({ id: '', name: '' });
    setPersonPlace({ id: '', name: '' });
    setTaskList([]);
    setNotes('');
  };

  const addVehicleClick = async () => {
    setAddVehicleStatus('loading');
    await delay();
    checkStock(stock)
      .then(result => {
        if (mounted.current && result.data && result.data.exists) {
          setAddVehicleStatus('');
          setStockError('stk# already exists');
        } else {
          const vehicleParam: AddVehicleParam = {
            stock: stock !== '' ? parseInt(stock) : 0,
            year: parseInt(year),
            make,
            model,
            trim,
            notes: notes ? notes : '',
          };
          const initialStageParam: InitialStageParam = {
            stage,
            personPlace,
            tasks: taskList
          };
          addVehicle(vehicleParam, initialStageParam)
            .then(result => {
              mounted.current && setAddVehicleStatus(result.status);
              if (result.status === 'success') {
                mounted.current && setAddedVehicle(result.doc);
                clearInputs();
              };
              if (result.status === 'failed') {
                console.error(result);
              };
            }, e => {
              mounted.current && setAddVehicleStatus('failed');
              console.error(e);
            });
        }
      }, e => {
        mounted.current && setAddVehicleStatus('failed');
        console.error(e);
      });
  };

  const [openSuccessDialog, setOpenSuccessDialog] = useState<boolean>(false);

  useEffect(() => {
    addVehicleStatus === 'success' ? setOpenSuccessDialog(true) : setOpenSuccessDialog(false);
  }, [addVehicleStatus, addedVehicle]);

  const [openFailureDialog, setOpenFailureDialog] = useState<boolean>(false);

  useEffect(() => {
    addVehicleStatus === 'failed' ? setOpenFailureDialog(true) : setOpenFailureDialog(false);
  }, [addVehicleStatus]);

  return (
    <>
      <form autoComplete='off'>
        <FlexCenter flexDirection='column'>
          <FormHelperText>*required field</FormHelperText>
          <VehicleInfoInputs mounted={mounted} addVehicleState={addVehicleState} classes={classes} />
          <StageAssignInputs mounted={mounted} addVehicleState={addVehicleState} classes={classes} />
          <NotesInput mounted={mounted} addVehicleState={addVehicleState} classes={classes} />
          <AddVehicleButton className={classes.inputField} addVehicleState={addVehicleState} addVehicleClick={addVehicleClick} />
          <AddVehicleSuccessDialog open={openSuccessDialog} addVehicleState={addVehicleState} />
          <AddVehicleFailureDialog open={openFailureDialog} addVehicleClick={addVehicleClick} addVehicleState={addVehicleState} />
        </FlexCenter>
      </form>
    </>
  );
}