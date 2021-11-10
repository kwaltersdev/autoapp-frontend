// react
import { useState, useEffect, useCallback } from 'react';
// material-ui
import Divider from '@mui/material/Divider';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Collapse from '@mui/material/Collapse';
import makeStyles from '@mui/styles/makeStyles';
// THIS PROJECT
// components
import { LargeCard, LargeContent, ContentHeader, IconContentTitle } from '../common/cardContent';
import { FlexSpaceBtwn } from '../common/flex';
import StatusFilter from './StatusFilter';
import VehicleOrder from './VehicleOrder';
import AddVehicleButton from './AddVehicleButton';
import VehicleListFilters from './vehicleListFilters/VehicleListFilters';
import VehicleList from './VehicleList';
import ViewFiltersButton from './ViewFiltersButton';
// hooks
import { useCheckMounted, useVehiclePage, useQuery } from '../../hooks';
// contexts
import { useDemoContext } from '../../contexts/DemoContext';
// services
import { getVehiclesPaged } from '../../services/vehicles';
// types
import { VehicleStatus, VehicleListState, VehiclePage } from '../../types/Vehicle';
import { GetRequestStatus } from '../../types/ServiceRequests';
import { ListOrder } from '../../types/misc';

const useStyles = makeStyles(theme => ({
  listControls: {
    margin: theme.spacing(1),
  },
}));

export default function AllVehicles(): React.ReactElement {
  const classes = useStyles();
  const mounted = useCheckMounted();
  const { delay } = useDemoContext();

  const { statusParam, sortParam, perPageParam, pageParam, compareParam } = useVehiclePage();
  const query = useQuery().toString();

  // state for ui
  const [statusFilter, setStatusFilter] = useState<VehicleStatus>(statusParam);
  const [sort, setSort] = useState<ListOrder>(sortParam);
  const [viewFilters, setViewFilters] = useState<boolean>(false);
  const [filterCount, setFilterCount] = useState<number>(0);

  // Get vehicles
  const [vehiclePage, setVehiclePage] = useState<VehiclePage>({ docStartNumber: 0, docEndNumber: 0, totalDocs: 0, vehicles: [] });
  const [getVehiclesStatus, setGetVehiclesStatus] = useState<GetRequestStatus>('loading');

  const vehicleListState: VehicleListState = {
    vehiclePage, setVehiclePage,
    getVehiclesStatus, setGetVehiclesStatus
  };

  const getVehicles = useCallback(
    async () => {
      setGetVehiclesStatus('loading');
      await delay();
      getVehiclesPaged(statusParam, sortParam, parseInt(perPageParam), pageParam, parseInt(compareParam), query)
        .then(result => {
          mounted.current && setGetVehiclesStatus(result.status as GetRequestStatus);
          result.status === 'success' && mounted.current && result.data && setVehiclePage(result.data);
          result.status === 'failed' && console.error(result);
        }, e => {
          mounted.current && setGetVehiclesStatus('failed');
          console.error(e);
        });
    },
    [delay, statusParam, sortParam, perPageParam, pageParam, compareParam, query, mounted]
  );

  useEffect(() => { getVehicles(); }, [getVehicles]);

  return (
    <LargeCard>
      <LargeContent style={{ position: 'relative' }} sx={{ zIndex: 0 }}>
        <AddVehicleButton />
        <ContentHeader>
          <IconContentTitle icon={<VisibilityIcon color='primary' />} variant='h5'>All Vehicles</IconContentTitle>
          <Divider />
          <FlexSpaceBtwn className={classes.listControls}>
            <StatusFilter filter={statusFilter} setFilter={setStatusFilter} />
            <VehicleOrder sort={sort} setSort={setSort} />
            <ViewFiltersButton viewFilters={viewFilters} setViewFilters={setViewFilters} filterCount={filterCount} />
          </FlexSpaceBtwn>
          <Divider />
          <Collapse in={viewFilters} timeout='auto' style={{ width: '100%' }}>
            <VehicleListFilters
              mounted={mounted}
              setViewFilters={setViewFilters}
              setFilterCount={setFilterCount}
            />
            <Divider />
          </Collapse>
        </ContentHeader>
        <VehicleList
          vehicleListState={vehicleListState}
          getVehicles={getVehicles}
        />
      </LargeContent>
    </LargeCard>
  );
};
