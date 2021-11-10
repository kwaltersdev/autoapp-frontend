// react
import { useEffect, useState, useCallback } from 'react';
// react-router-dom
import { useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Divider from '@mui/material/Divider';
import AccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
// THIS PROJECT
// components
import VehicleListItemButton from '../common/vehicles/VehicleListItemButton';
import FormatTime from '../common/FormatTime';
import VehicleInfo from '../common/vehicles/VehicleInfo';
import VehicleChipGroup from '../common/vehicles/VehicleChipGroup';
import VehicleChip from '../common/vehicles/VehicleChip';
import NavigateStageVehicleList from '../common/vehicles/NavigateAccordianVehicleList';
import LoadingList from '../common/LoadingList';
import CenteredError from '../common/CenteredError';
// hooks
import { useCheckMounted } from '../../hooks';
// services
import { getVehiclesPaged } from '../../services/vehicles';
// contexts
import { useDemoContext } from '../../contexts/DemoContext';
// types
import { DetailedVehicle } from '../../types/Vehicle';
import { VehiclePage } from '../../types/Vehicle';
import { GetRequestStatus } from '../../types/ServiceRequests';
import { Page } from '../../types/misc';

const useStyles = makeStyles(theme => ({
  accordianDetails: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  vehicleList: {
    width: '100%',
  },
}));

interface StageVehicleListProps {
  stageId: string;
}
export default function StageVehicleList(props: StageVehicleListProps): React.ReactElement {
  const classes = useStyles();
  const mounted = useCheckMounted();
  const { delay } = useDemoContext();
  const { stageId } = props;

  const [vehiclePage, setVehiclePage] = useState<VehiclePage>({ docStartNumber: 0, docEndNumber: 0, totalDocs: 0, vehicles: [] });
  const [getVehiclesStatus, setGetVehiclesStatus] = useState<GetRequestStatus>('loading');

  const getVehicles = useCallback(
    async (page: Page, compare: number) => {
      setGetVehiclesStatus('loading');
      await delay();
      getVehiclesPaged('active', 'asc', 5, page, compare, `stageId=${stageId}`)
        .then(result => {
          mounted.current && setGetVehiclesStatus(result.status as GetRequestStatus);
          result.status === 'success' && mounted.current && result.data && setVehiclePage(result.data);
          result.status === 'failed' && console.error(result);
        }, e => {
          mounted.current && setGetVehiclesStatus('failed');
          console.error(e);
        });
    },
    [delay, mounted, stageId]
  );

  useEffect(() => { getVehicles('first', 0); }, [getVehicles]);

  let list: JSX.Element;
  if (getVehiclesStatus === 'failed') {
    list = <CenteredError errorMessage='Error loading vehicles...' />;
  } else if (getVehiclesStatus === 'loading') {
    list = <LoadingList skeletonCount={10} />;
  } else {
    list = <>
      <List className={classes.vehicleList}>
        {vehiclePage.vehicles.map(vehicle => <StageVehicle key={vehicle.id} vehicle={vehicle} />)}
      </List>
      <NavigateStageVehicleList vehiclePage={vehiclePage} getVehicles={getVehicles} />
    </>;
  }
  return (
    <AccordionDetails className={classes.accordianDetails}>
      {list}
    </AccordionDetails>
  );
}

const useVehicleStyles = makeStyles(theme => ({
  vehicle: {
    width: '100%',
  },
  vehicleDivider: {
    width: '98%',
  },
}));

interface VehicleProps {
  vehicle: DetailedVehicle;
};
function StageVehicle(props: VehicleProps): React.ReactElement {
  const classes = useVehicleStyles();
  const history = useHistory();
  const { vehicle } = props;

  const timeElapsed = (dateAssigned: number) => {
    const difference: number = Date.now() - dateAssigned;
    return <FormatTime milliseconds={difference} />;
  };

  const selectVehicle = (vehicleId: string | undefined) => {
    history.push(`/vehicle-details/id/${vehicleId}/stage?prev=/stages`);
  };

  return (
    <div key={vehicle.id} className={classes.vehicle}>
      <Divider className={classes.vehicleDivider} />
      <VehicleListItemButton onClick={() => selectVehicle(vehicle.id)}>
        <VehicleInfo vehicle={vehicle} listItem />
        <VehicleChipGroup>
          <VehicleChip size='small' label={timeElapsed(vehicle.currentStage.dateAssigned)} />
          <VehicleChip size='small' label={vehicle.currentStage.personPlace.name} color='primary' />
        </VehicleChipGroup>
      </VehicleListItemButton>
      <Divider className={classes.vehicleDivider} />
    </div>
  );
}