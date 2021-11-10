// react
import { useState, useEffect, useCallback } from 'react';
// react-router-dom
import { useParams } from 'react-router-dom';
// material-ui
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import makeStyles from '@mui/styles/makeStyles';
// THIS PROJECT
// components
import { LargeCard, LargeContent, ContentHeader } from '../common/cardContent';
import { FlexCenter } from '../common/flex';
import GetVehicleLoading from './GetVehicleLoading';
import VehicleInfo from '../common/vehicles/VehicleInfo';
import ActionMenu from './ActionMenu';
import VehicleTabs from './vehicleTabs/VehicleTabs';
import DetailsDoneButton from './DetailsDoneButton';
import VehicleFailed from './VehicleFailed';
import CenteredError from '../common/CenteredError';
import TrashedMessage from './TrashedMessage';
import UpdateVehicleLoading from './UpdateVehicleLoading';
// hooks
import { useCheckMounted } from '../../hooks';
// services
import { findVehicle as findVehicleService } from '../../services/vehicles';
// contexts
import { useDemoContext } from '../../contexts/DemoContext';
// types
import { DetailedVehicle, VehicleDetailState } from '../../types/Vehicle';
import { GetRequestStatus, PostRequestStatus } from '../../types/ServiceRequests';

const useStyles = makeStyles(theme => ({
  vehicleTitle: {
    maxWidth: '80%',
  },
}));

export default function VehicleDetails(): React.ReactElement {
  const classes = useStyles();
  const mounted = useCheckMounted();
  const { delay } = useDemoContext();
  type IdParam = { searchCriteria: 'id' | 'stock', searchValue: string; };
  const { searchCriteria, searchValue } = useParams<IdParam>();

  // VEHICLE INFO
  const [vehicle, setVehicle] = useState<DetailedVehicle | null>(null);
  const [getVehicleStatus, setGetVehicleStatus] = useState<GetRequestStatus>('loading');
  const [getVehicleError, setGetVehicleError] = useState<string>('');
  const [updateVehicleStatus, setUpdateVehicleStatus] = useState<PostRequestStatus>('');
  const [disableDoneButton, setDisableDoneButton] = useState<boolean>(false);

  const vehicleDetailState: VehicleDetailState = {
    mounted,
    vehicle, setVehicle,
    getVehicleStatus, setGetVehicleStatus,
    updateVehicleStatus, setUpdateVehicleStatus,
    setDisableDoneButton
  };

  const findVehicle = useCallback(async () => {
    setGetVehicleError('');
    setGetVehicleStatus('loading');
    await delay();
    findVehicleService(searchCriteria, searchValue)
      .then(result => {
        mounted.current && result.status === 'success' && !result.data
          && setGetVehicleError(`No vehicles match ${searchCriteria}: ${searchValue}`);
        mounted.current && setGetVehicleStatus(result.status as GetRequestStatus);
        mounted.current && setVehicle(result.data);
      }, e => {
        mounted.current && setGetVehicleStatus('failed');
        console.error(e);
      });
  },
    [delay, searchCriteria, searchValue, mounted]
  );

  useEffect(() => {
    findVehicle();
  }, [findVehicle]);

  if (getVehicleStatus === 'loading') {
    return <GetVehicleLoading />;
  };

  if (updateVehicleStatus === 'loading') {
    return <UpdateVehicleLoading />;
  }

  if (getVehicleStatus === 'failed' || getVehicleError !== '') {
    return <VehicleFailed errorMessage={getVehicleError} retryAction={() => window.location.reload()} />;
  };

  return (
    <LargeCard>
      <LargeContent>
        <ContentHeader>
          <FlexCenter style={{ position: 'relative' }} >
            <div className={classes.vehicleTitle}>{vehicle && <VehicleInfo vehicle={vehicle} variant='h6' />}</div>
            <Box position='absolute' right={0}>
              {vehicleDetailState.vehicle && <ActionMenu vehicleDetailState={vehicleDetailState} mounted={mounted} />}
            </Box>
          </FlexCenter>
        </ContentHeader>
        <Divider />
        {updateVehicleStatus === 'failed'
          ? <CenteredError errorMessage='Failed to update vehicle details' />
          : vehicle?.status === 'trash'
            ? <TrashedMessage />
            : <>
              <VehicleTabs vehicleDetailState={vehicleDetailState} />
              <DetailsDoneButton
                disableDoneButton={disableDoneButton}
                mounted={mounted}
                vehicle={vehicle}
                setUpdateVehicleStatus={setUpdateVehicleStatus}
              />
            </>}
      </LargeContent>
    </LargeCard>
  );
}