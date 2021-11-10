// react
import { useState, useEffect, useCallback } from 'react';
// material-ui
import Divider from '@mui/material/Divider';
import EqualizerIcon from '@mui/icons-material/Equalizer';
// THIS PROJECT
// components
import { LargeCard, LargeContent, ContentHeader, IconContentTitle } from '../common/cardContent';
import { VehicleTurnStats } from '../../types/Statistics';
import { GetRequestStatus } from '../../types/ServiceRequests';
import AnalyticsTabs from './analyticsTabs/AnalyticsTabs';
// services
import { getVehicleTurnStats as getVehicleTurnStatsService } from '../../services/statistics';
// hooks
import { useCheckMounted } from '../../hooks';
// contexts
import { useDemoContext } from '../../contexts/DemoContext';

export default function Statistics(): React.ReactElement {
  const mounted = useCheckMounted();
  const { delay } = useDemoContext();

  const [vehicleTurnStats, setVehicleTurnStats] = useState<VehicleTurnStats | null>(null);
  const [getTurnStatsStatus, setGetTurnStatsStatus] = useState<GetRequestStatus>('');

  const getVehicleTurnStats = useCallback(
    async () => {
      setGetTurnStatsStatus('loading');
      await delay();
      getVehicleTurnStatsService()
        .then(result => {
          mounted.current && setGetTurnStatsStatus(result.status as GetRequestStatus);
          result.status === 'success' && mounted.current && result.data && setVehicleTurnStats(result.data);
          result.status === 'failed' && console.error(result);
        }, e => {
          mounted.current && setGetTurnStatsStatus('failed');
          console.error(e);
        });
    },
    [delay, mounted]
  );

  useEffect(() => { getVehicleTurnStats(); }, [getVehicleTurnStats]);

  return (
    <LargeCard>
      <LargeContent>
        <ContentHeader>
          <IconContentTitle icon={<EqualizerIcon color='primary' />} variant='h5'>Analytics</IconContentTitle>
        </ContentHeader>
        <Divider />
        <AnalyticsTabs turnStatistics={vehicleTurnStats} getTurnStatsStatus={getTurnStatsStatus} />
      </LargeContent>
    </LargeCard>
  );
}