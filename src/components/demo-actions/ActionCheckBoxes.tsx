// react
import React, { useState, useEffect } from 'react';
// react-router-dom
import { useHistory } from 'react-router-dom';
// material-ui
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
// THIS PROJECT
// components
import { FlexCenter } from '../common/flex';
import DemoContinueButton from './DemoContinueButton';
import CenteredError from '../common/CenteredError';
import GenerateDemoVehicles from './GenerateDemoVehicles';
import LoadingDemoActions from './LoadingDemoActions';
// hooks
import { useCheckMounted } from '../../hooks';
// types
import { DemoState } from '../../types/Demo';
import { DeleteRequestStatus, PostRequestStatus } from '../../types/ServiceRequests';

const useStyles = makeStyles((theme: Theme) => ({
  formControl: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
}));

export default function ActionCheckBoxes(): React.ReactElement {
  const classes = useStyles();
  const mounted = useCheckMounted();
  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [clearDatabase, setClearDatabase] = useState<boolean>(false);
  const [clearDatabaseStatus, setClearDatabaseStatus] = useState<DeleteRequestStatus>('');
  const [addVehicleDescriptors, setAddVehicleDescriptors] = useState<boolean>(false);
  const [addVehicleDescriptorsStatus, setAddVehicleDescriptorsStatus] = useState<PostRequestStatus>('');
  const [addStages, setAddStages] = useState<boolean>(false);
  const [addStagesStatus, setAddStagesStatus] = useState<PostRequestStatus>('');
  const [generateVehicles, setGenerateVehicles] = useState<boolean>(false);
  const [generateVehiclesStatus, setGenerateVehiclesStatus] = useState<PostRequestStatus>('');

  // generate vehicles state
  const [vehiclesAmountInput, setVehiclesAmountInput] = useState<string>('300');
  const [vehiclesAmountError, setVehiclesAmountError] = useState<string>('');
  const [vehiclesAmount, setVehiclesAmount] = useState<string>('300');
  const [months, setMonths] = useState<string>('12');
  const [monthsError, setMonthsError] = useState<string>('');

  const demoState: DemoState = {
    mounted,
    loading, setLoading,
    error, setError,
    clearDatabase, setClearDatabase,
    clearDatabaseStatus, setClearDatabaseStatus,
    addVehicleDescriptors, setAddVehicleDescriptors,
    addVehicleDescriptorsStatus, setAddVehicleDescriptorsStatus,
    addStages, setAddStages,
    addStagesStatus, setAddStagesStatus,
    generateVehicles, setGenerateVehicles,
    generateVehiclesStatus, setGenerateVehiclesStatus,
    vehiclesAmount,
    vehiclesAmountError,
    months,
    monthsError
  };

  // rules for which actions must also be selected if a certain action is selected
  useEffect(() => {
    if (generateVehicles) {
      setClearDatabase(true);
      setAddVehicleDescriptors(true);
      setAddStages(true);
    } else if (addVehicleDescriptors || addStages) {
      setClearDatabase(true);
    }
  }, [generateVehicles, addVehicleDescriptors, addStages]);

  // reroute to 'all-vehicles' if actions are successful
  useEffect(() => {
    if (!loading) {
      const statuses = [
        { check: clearDatabase, status: clearDatabaseStatus },
        { check: addVehicleDescriptors, status: addVehicleDescriptorsStatus },
        { check: addStagesStatus, status: addStagesStatus },
        { check: generateVehicles, status: generateVehiclesStatus }
      ];
      if (statuses.find(status => status.status !== '')) {
        const statusesCheck = statuses.map(status => status.check === true ? status.status === 'success' : true);
        if (statusesCheck.find(check => !check) === undefined) {
          setClearDatabase(false);
          setClearDatabaseStatus('');
          setAddVehicleDescriptors(false);
          setAddVehicleDescriptorsStatus('');
          setAddStages(false);
          setAddStagesStatus('');
          setGenerateVehicles(false);
          setGenerateVehiclesStatus('');
          history.push(`/all-vehicles/active/asc/10/first/0`);
        } else {
          setError(true);
        }
      };
    };
  }, [
    loading,
    clearDatabase, clearDatabaseStatus,
    addVehicleDescriptors, addVehicleDescriptorsStatus,
    addStages, addStagesStatus,
    generateVehicles, generateVehiclesStatus,
    history
  ]);

  if (error) {
    return <CenteredError errorMessage='An error occured in 1 or more demo actions....' />;
  }

  return (
    <>
      <LoadingDemoActions
        loading={loading}
        clearDatabaseStatus={clearDatabaseStatus}
        addVehicleDescriptorsStatus={addVehicleDescriptorsStatus}
        addStagesStatus={addStagesStatus}
        generateVehiclesStatus={generateVehiclesStatus}
      />
      <FlexCenter flexDirection='column'>
        <FormControl component={Paper} className={classes.formControl}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  disabled={addVehicleDescriptors || addStages || generateVehicles}
                  checked={clearDatabase}
                  onChange={() => clearDatabase ? setClearDatabase(false) : setClearDatabase(true)}
                />
              }
              label="Clear Database"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color='primary'
                  disabled={generateVehicles}
                  checked={addVehicleDescriptors}
                  onChange={() => addVehicleDescriptors ? setAddVehicleDescriptors(false) : setAddVehicleDescriptors(true)}
                />
              }
              label="Add Vehicle Descriptors"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color='primary'
                  disabled={generateVehicles}
                  checked={addStages}
                  onChange={() => addStages ? setAddStages(false) : setAddStages(true)}
                />
              }
              label="Add Stages and People/Places"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  color='primary'
                  checked={generateVehicles}
                  onChange={() => generateVehicles ? setGenerateVehicles(false) : setGenerateVehicles(true)}
                />
              }
              label="Generate Demo Vehicles"
            />
            <GenerateDemoVehicles
              generateVehicles={generateVehicles}
              vehiclesAmountInput={vehiclesAmountInput} setVehiclesAmountInput={setVehiclesAmountInput}
              vehiclesAmountError={vehiclesAmountError} setVehiclesAmountError={setVehiclesAmountError}
              setVehiclesAmount={setVehiclesAmount}
              months={months} setMonths={setMonths}
              monthsError={monthsError} setMonthsError={setMonthsError}
            />
          </FormGroup>
        </FormControl>
        <DemoContinueButton demoState={demoState} />
      </FlexCenter>
    </>
  );
}