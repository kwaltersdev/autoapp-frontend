// material-ui
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
// THIS PROJECT
// types
import { AddVehicleState } from '../../types/Vehicle';

interface AddVehicleButtonProps {
  addVehicleState: AddVehicleState;
  addVehicleClick: () => void;
  className?: string;
};
export default function AddVehicleButton(props: AddVehicleButtonProps): React.ReactElement {
  const { addVehicleState, addVehicleClick, className } = props;
  const { stockOkay, year, make, model, stage, personPlace, addVehicleStatus } = addVehicleState;

  if (addVehicleStatus === 'loading') {
    return <CircularProgress style={{ width: '25px', margin: 'auto' }} />;
  }

  if (stockOkay && year && make.id && model.id && stage.id && personPlace.id) {
    return (
      <FormControl className={className ? className : ''}>
        <Button variant='contained' color='primary' onClick={addVehicleClick}>
          ADD
        </Button>
      </FormControl>
    );
  }

  return (
    <FormControl className={className ? className : ''}>
      <Button variant='contained' color='primary' disabled>ADD</Button>
    </FormControl>
  );
}