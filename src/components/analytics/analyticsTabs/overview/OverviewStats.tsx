// material-ui
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
// THIS PROJECT
// components
import { FlexCenter } from '../../../common/flex';
import DonutChart from '../../../common/DonutChart';
import CenteredError from '../../../common/CenteredError';
import OverviewDetailsTable from './OverviewDetailsTable';
import DetailsButton from '../DetailsButton';
// types
import { VehicleTurnStats, NameValueData } from '../../../../types/Statistics';
import { GetRequestStatus } from '../../../../types/ServiceRequests';

interface OverviewStatisticsProps {
  turnStatistics: VehicleTurnStats | null;
  getTurnStatsStatus: GetRequestStatus;
};
export default function OverviewStatistics(props: OverviewStatisticsProps): React.ReactElement {
  const { turnStatistics, getTurnStatsStatus } = props;
  const count = turnStatistics?.count;
  const average = turnStatistics?.average;
  const median = turnStatistics?.median;
  const mode = turnStatistics?.mode;

  const chartData: NameValueData[] = average
    ? [
      { name: 'Recondition Time', value: average.getForSale },
      { name: 'To Get Sold', value: average.getSold }
    ]
    : [];

  if (getTurnStatsStatus === 'loading') {
    return (
      <Paper>
        <FlexCenter flexDirection='column' sx={{ height: 500 }}>
          <Skeleton variant='rectangular' height={'90%'} width={'90%'} style={{ margin: 'auto' }} />
        </FlexCenter>
      </Paper>
    );
  } else if (getTurnStatsStatus === 'failed') {
    return <CenteredError errorMessage='Failed to load statistics...' retryAction={() => window.location.reload()} />;
  } else {
    return (
      <>
        {turnStatistics && count && average && median && mode
          ? <FlexCenter flexDirection='column'>
            <DonutChart
              data={chartData}
              total={average.total}
              totalLabel='avg total time to be sold'
            />
            <DetailsButton>
              <OverviewDetailsTable turnStatistics={turnStatistics} />
            </DetailsButton>
          </FlexCenter>
          : <></>}
      </>
    );
  };
}