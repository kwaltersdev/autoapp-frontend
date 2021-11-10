// material-ui
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
// THIS PROJECT
// components
import { FlexCenter } from '../common/flex';
// types
import { Set } from '../../types/misc';

interface GenerateDemoVehiclesProps {
  generateVehicles: boolean;
  vehiclesAmountInput: string;
  setVehiclesAmountInput: Set<string>;
  vehiclesAmountError: string;
  setVehiclesAmountError: Set<string>;
  setVehiclesAmount: Set<string>;
  months: string;
  setMonths: Set<string>;
  monthsError: string;
  setMonthsError: Set<string>;
}
export default function GenerateDemoVehicles(props: GenerateDemoVehiclesProps): React.ReactElement {
  const {
    generateVehicles,
    vehiclesAmountInput, setVehiclesAmountInput,
    vehiclesAmountError, setVehiclesAmountError,
    setVehiclesAmount,
    months, setMonths,
    monthsError, setMonthsError
  } = props;

  const changeVehiclesAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vehiclesAmountInputTmp = e.target.value.trim()
      // remove all non digit inputs 
      .replace(/[^0-9]/g, '')
      // add comma seperators
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setVehiclesAmountInput(vehiclesAmountInputTmp);
    const vehiclesAmountTmp = vehiclesAmountInputTmp.replace(',', '');
    setVehiclesAmount(vehiclesAmountTmp);
    const formatTest = /^\d+$/;
    if (!formatTest.test(vehiclesAmountTmp)) {
      setVehiclesAmountError('Vehice Amount must be a whole number');
    } else if (parseInt(vehiclesAmountTmp) > 10000) {
      setVehiclesAmountError('Vehicle Amount must be less than 10,000');
    } else {
      setVehiclesAmountError('');
    }
  };

  const changeMonths = (e: React.ChangeEvent<HTMLInputElement>) => {
    const monthsTmp = e.target.value.trim().replace(/[^0-9]/g, '');
    setMonths(monthsTmp);
    const formatTest = /^\d+$/;
    if (!formatTest.test(monthsTmp)) {
      setMonthsError('Months must be a whole number');
    } else if (parseInt(monthsTmp) > 36) {
      setMonthsError('Months must be less than or equal to 36');
    } else {
      setMonthsError('');
    }
  };

  return (
    <Collapse in={generateVehicles}>
      <FlexCenter flexDirection='column'>
        <TextField
          size='small'
          margin='normal'
          id='vehicle-amount'
          label='Amount of Vehicles to Add'
          variant='outlined'
          value={vehiclesAmountInput}
          onChange={changeVehiclesAmount}
          error={vehiclesAmountError ? true : false}
          helperText={vehiclesAmountError}
        />
        <TextField
          size='small'
          margin='normal'
          id='months'
          label='Amount of Months to Go Back'
          variant='outlined'
          value={months}
          onChange={changeMonths}
          error={monthsError ? true : false}
          helperText={monthsError}
        />
      </FlexCenter>
    </Collapse>
  );
}
