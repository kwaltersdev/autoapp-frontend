// react
import { useEffect, useState, useCallback } from 'react';
// materal-ui
import Divider from '@mui/material/Divider';
import VisibilityIcon from '@mui/icons-material/Visibility';
// THIS PROJECT
// components
import CenteredError from '../common/CenteredError';
import LoadingList from '../common/LoadingList';
import { LargeCard, LargeContent, ContentHeader, IconContentTitle } from '../common/cardContent';
import AccordianVehicleList from '../common/vehicles/AccordianVehicleList';
// services
import { getPersonPlaceVehicleCounts as getPersonPlaceVehicleCountsService } from '../../services/stages';
// contexts
import { useDemoContext } from '../../contexts/DemoContext';
// hooks
import { useCheckMounted } from '../../hooks';
// types
import { GetRequestStatus } from '../../types/ServiceRequests';
import { PersonPlaceVehicleCount } from '../../types/Stage';

export default function PeoplePlaces(): React.ReactElement {
  const mounted = useCheckMounted();
  const { delay } = useDemoContext();

  // Get People/Places
  const [peoplePlaces, setPeoplePlaces] = useState<PersonPlaceVehicleCount[]>([]);
  const [getPeoplePlacesStatus, setGetPeoplePlacesStatus] = useState<GetRequestStatus>('loading');

  const getPersonPlaceVehicleCounts = useCallback(
    async () => {
      setGetPeoplePlacesStatus('loading');
      await delay();
      getPersonPlaceVehicleCountsService()
        .then(result => {
          mounted.current && setGetPeoplePlacesStatus(result.status as GetRequestStatus);
          mounted.current && result.status === 'success' && result.data && setPeoplePlaces(result.data);
          result.status === 'failed' && console.error(result);
        }, e => {
          mounted.current && setGetPeoplePlacesStatus('failed');
          console.error(e);
        });
    }, [delay, mounted]
  );

  useEffect(() => { getPersonPlaceVehicleCounts(); }, [getPersonPlaceVehicleCounts]);

  let list: JSX.Element;
  if (getPeoplePlacesStatus === 'failed') {
    list = <CenteredError errorMessage='Error loading People/Places view....' retryAction={() => window.location.reload()} />;
  } else if (getPeoplePlacesStatus === 'loading') {
    list = <LoadingList skeletonCount={10} />;
  } else {
    list = <AccordianVehicleList variant='peoplePlaces' accordianTitles={peoplePlaces} />;
  };

  return (
    <LargeCard>
      <LargeContent>
        <ContentHeader>
          <IconContentTitle icon={<VisibilityIcon color='primary' />} variant='h5'>People/Places</IconContentTitle>
          <Divider />
        </ContentHeader>
        <br></br>
        {list}
      </LargeContent>
    </LargeCard>
  );
}