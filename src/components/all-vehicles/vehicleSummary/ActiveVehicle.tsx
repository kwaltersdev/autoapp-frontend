// material-ui
import Divider from '@mui/material/Divider';
// THIS PROJECT
// components
import VehicleListItemButton from '../../common/vehicles/VehicleListItemButton';
import VehicleInfo from '../../common/vehicles/VehicleInfo';
import VehicleChipGroup from '../../common/vehicles/VehicleChipGroup';
import VehicleChip from '../../common/vehicles/VehicleChip';
// hooks
import { useAuthContext } from '../../../contexts/AuthContext';
// types
import { DetailedVehicle } from '../../../types/Vehicle';

interface ActiveVehicleProps {
  vehicle: DetailedVehicle;
  onClick: () => void;
  className?: string;
};
export default function ActiveVehicle(props: ActiveVehicleProps): React.ReactElement {
  const { vehicle, onClick, className } = props;
  const { currentStage } = vehicle;
  const { stage, personPlace, status } = currentStage;
  const { userPreferences } = useAuthContext();
  const { defaultStageAssignment } = userPreferences;
  const { stage: defaultStage, personPlace: defaultPersonPlace } = defaultStageAssignment;

  return (
    <>
      <VehicleListItemButton className={className ? className : ''} onClick={onClick}>
        <VehicleInfo vehicle={vehicle} listItem />
        <VehicleChipGroup>
          {stage.name === 'Assign'
            ? <VehicleChip size='small' label={stage.name} color='secondary' />
            : status === 'complete'
              ? <VehicleChip size='small' label={defaultStage.name} color='secondary' />
              : <VehicleChip size='small' label={stage.name} color='primary' />
          }
          {status === 'complete'
            ? <VehicleChip size='small' label={defaultPersonPlace.name} />
            : <VehicleChip size='small' label={personPlace.name} />}
        </VehicleChipGroup>
      </VehicleListItemButton>
      <Divider />
    </>
  );
}