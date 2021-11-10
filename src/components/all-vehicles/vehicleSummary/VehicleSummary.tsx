// react-router-dom
import { useHistory } from 'react-router-dom';
// THIS PROJECT
// components
import ActiveVehicle from './ActiveVehicle';
import SoldVehicle from './SoldVehicle';
import TrashedVehicle from './TrashedVehicle';
// hooks
import { useQuery, useVehiclePage } from '../../../hooks';
// types
import { DetailedVehicle } from '../../../types/Vehicle';

interface VehicleSummaryProps {
  vehicle: DetailedVehicle;
  getVehicles: () => void;
};
export default function VehicleSummary(props: VehicleSummaryProps): React.ReactElement {
  const history = useHistory();
  const { vehicle, getVehicles } = props;
  const { status } = vehicle;

  const { statusParam, sortParam, perPageParam, pageParam, compareParam } = useVehiclePage();
  const queryString = useQuery().toString();

  const vehicleClick = () =>
    history.push(`/vehicle-details/id/${vehicle.id}/stage?prev=/all-vehicles/${statusParam}/${sortParam}/${perPageParam}/${pageParam}/${compareParam}?${queryString}`);

  switch (status) {
    case 'active':
      return <ActiveVehicle vehicle={vehicle} onClick={vehicleClick} />;
    case 'sold':
      return <SoldVehicle vehicle={vehicle} onClick={vehicleClick} />;
    case 'trash':
      return <TrashedVehicle vehicle={vehicle} getVehicles={getVehicles} />;
  };
}