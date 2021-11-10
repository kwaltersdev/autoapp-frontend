// react
import { useEffect, useState, useCallback } from 'react';
// material-ui
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
// THIS PROJECT
// components
import DonutChart from '../../common/DonutChart';
import CenteredError from '../../common/CenteredError';
import { FlexCenter } from '../../common/flex';
import StatisticDetails from './StatisticDetails';
import DetailsButton from './DetailsButton';
// hooks
import { useCheckMounted } from '../../../hooks';
// contexts
import { useDemoContext } from '../../../contexts/DemoContext';
// services
import { getStagesStatistics as getStagesStatisticsService } from '../../../services/statistics';
// types
import { NameValueData, DetailedAssignmentStats } from '../../../types/Statistics';
import { GetRequestStatus } from '../../../types/ServiceRequests';

interface StageStatisticsProps {
  forSaleAvg: number,
};
export default function StagesStatistics(props: StageStatisticsProps): React.ReactElement {
  const mounted = useCheckMounted();
  const { forSaleAvg } = props;
  const { delay } = useDemoContext();

  const [getStatsStatus, setGetStatsStatus] = useState<GetRequestStatus>('loading');

  const [chartData, setChartData] = useState<NameValueData[] | null>(null);
  const [statistics, setStatistics] = useState<DetailedAssignmentStats[] | null>(null);

  const getStagesStatistics = useCallback(async () => {
    setGetStatsStatus('loading');
    await delay();
    getStagesStatisticsService()
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
    getStagesStatistics();
  }, [getStagesStatistics]);

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
          <DonutChart
            data={chartData}
            total={forSaleAvg}
            totalLabel='avg time to get "For Sale"'
          />
          <DetailsButton>
            <StatisticDetails statistics={statistics} />
          </DetailsButton>
        </FlexCenter>
        : <></>}
    </>
  );
}