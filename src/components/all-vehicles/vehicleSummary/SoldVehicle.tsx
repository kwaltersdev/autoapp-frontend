// material-ui
import Divider from '@mui/material/Divider';
// THIS PROJECT
// components
import VehicleListItemButton from '../../common/vehicles/VehicleListItemButton';
import VehicleInfo from '../../common/vehicles/VehicleInfo';
import FormatTime from '../../common/FormatTime';
import VehicleChipGroup from '../../common/vehicles/VehicleChipGroup';
import SoldVehicleChip from '../../common/vehicles/SoldVehicleChip';
// types
import { DetailedVehicle } from '../../../types/Vehicle';

interface SoldVehicleProps {
  vehicle: DetailedVehicle;
  onClick: () => void;
  className?: string;
};
export default function SoldVehicle(props: SoldVehicleProps): React.ReactElement {
  const { vehicle, onClick, className } = props;
  const { totalSellTime } = vehicle;

  return (
    <>
      <VehicleListItemButton className={className ? className : ''} onClick={onClick}>
        <VehicleInfo vehicle={vehicle} listItem />
        <VehicleChipGroup>
          <SoldVehicleChip size='small' label={totalSellTime && <FormatTime milliseconds={totalSellTime} />} />
        </VehicleChipGroup>
      </VehicleListItemButton>
      <Divider />
    </>
  );
}