// react
import { useEffect, useState, useCallback } from 'react';
// material-ui
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
// THIS PROJECT
// components
import VerticalBarChart from '../../common/VerticalBarChart';
import CenteredError from '../../common/CenteredError';
import { FlexCenter } from '../../common/flex';
import { DetailedAssignmentStats, NameValueDataInclPercentile } from '../../../types/Statistics';
import StatisticDetails from './StatisticDetails';
import DetailsButton from './DetailsButton';
// hooks
import { useCheckMounted } from '../../../hooks';
// contexts
import { useDemoContext } from '../../../contexts/DemoContext';
// services
import { getPeoplePlacesStatistics as getPeoplePlacesStatisticsService } from '../../../services/statistics';
// types
import { GetRequestStatus } from '../../../types/ServiceRequests';

export default function PeoplePlacesStatistics(): React.ReactElement {
  const mounted = useCheckMounted();
  const { delay } = useDemoContext();

  const [getStatsStatus, setGetStatsStatus] = useState<GetRequestStatus>('loading');

  const [chartData, setChartData] = useState<NameValueDataInclPercentile[] | null>(null);
  const [statistics, setStatistics] = useState<DetailedAssignmentStats[] | null>(null);

  const getPeoplePlaceStatistics = useCallback(async () => {
    setGetStatsStatus('loading');
    await delay();
    getPeoplePlacesStatisticsService()
      .then(result => {
        mounted.current && setGetStatsStatus(result.status as GetRequestStatus);
        if (result.status === 'success' && mounted.current && result.data) {
          setChartData(result.data.avgOverview.filter(doc => doc.name !== 'For Sale'));
          setStatistics(result.data.details);
        }
        result.status === 'failed' && console.error(result);
      }, e => {
        mounted.current && setGetStatsStatus('failed');
        console.error(e);
      });
  },
    [delay, mounted]
  );

  useEffect(() => {
    getPeoplePlaceStatistics();
  }, [getPeoplePlaceStatistics]);

  if (getStatsStatus === 'loading') {
    return (
      <Paper>
        <FlexCenter flexDirection='column' sx={{ height: 500 }}>
          <Skeleton variant='rectangular' height={'90%'} width={'90%'} style={{ margin: 'auto' }} />
        </FlexCenter>
      </Paper>
    );
  };
  if (getStatsStatus === 'failed') {
    return <CenteredError errorMessage='Failed to load statistics...' retryAction={() => window.location.reload()} />;
  };
  return (
    <>
      {chartData && statistics
        ? <FlexCenter flexDirection='column'>
          <VerticalBarChart data={chartData} />
          <DetailsButton>
            <StatisticDetails statistics={statistics} />
          </DetailsButton>
        </FlexCenter>
        : <></>}
    </>
  );
}