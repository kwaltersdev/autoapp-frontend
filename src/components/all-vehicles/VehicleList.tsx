// material-ui
import List from '@mui/material/List';
// THIS PROJECT
// components
import CenteredError from '../common/CenteredError';
import LoadingList from '../common/LoadingList';
import VehicleSummary from './vehicleSummary/VehicleSummary';
import ListNavigation from './ListNavigation';
// types
import { VehicleListState } from '../../types/Vehicle';

interface VehicleListProps {
  vehicleListState: VehicleListState;
  getVehicles: () => void;
};
export default function VehicleList(props: VehicleListProps): React.ReactElement {
  const { vehicleListState, getVehicles } = props;
  const { vehiclePage, getVehiclesStatus } = vehicleListState;

  let list: JSX.Element;
  switch (getVehiclesStatus) {
    case 'failed':
      list = <CenteredError errorMessage='Error loading vehicles' retryAction={() => window.location.reload()} />;
      break;
    case 'loading':
      list = <LoadingList skeletonCount={20} />;
      break;
    default:
      list = (
        <>
          <List>
            {vehiclePage.vehicles.map(vehicle => {
              if (vehicle.id) {
                return <VehicleSummary
                  key={vehicle.id}
                  vehicle={vehicle}
                  getVehicles={getVehicles}
                />;
              } else {
                return <></>;
              }

            })}
          </List>
          <ListNavigation vehiclePage={vehicleListState.vehiclePage} />
        </>
      );
  }

  return <>{list}</>;
}