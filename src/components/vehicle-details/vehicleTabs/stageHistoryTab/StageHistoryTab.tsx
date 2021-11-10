// react
import { useState, useEffect, useCallback } from "react";
// material-ui
import Skeleton from '@mui/material/Skeleton';
// THIS PROJECT
// components
import { ContentPaper } from '../../../common/cardContent';
import TabContent from '../TabContent';
import HistoryTitleMenu from './HistoryTitleMenu';
import HistoryTable from './HistoryTable';
// services
import { getStageHistory as getStageHistoryService } from '../../../../services/stages';
// contexts
import { useDemoContext } from "../../../../contexts/DemoContext";
// hooks
import { useCheckMounted } from '../../../../hooks';
// types
import { GetRequestStatus } from '../../../../types/ServiceRequests';
import { StageAssignment } from "../../../../types/StageAssignment";
import { ListOrder } from "../../../../types/misc";

interface StageHistoryTabProps {
  vehicleId: string;
};
export default function StageHistoryTab(props: StageHistoryTabProps): React.ReactElement {
  const mounted = useCheckMounted();
  const { delay } = useDemoContext();
  const { vehicleId } = props;

  const [stageHistory, setStageHistory] = useState<StageAssignment[]>([]);
  const [getStageHistoryStatus, setGetStageHistoryStatus] = useState<GetRequestStatus>('');

  const getStageHistory = useCallback(async () => {
    setGetStageHistoryStatus('loading');
    await delay();
    getStageHistoryService(vehicleId)
      .then(result => {
        mounted.current && result.data && setStageHistory(result.data);
        mounted.current && setGetStageHistoryStatus(result.status as GetRequestStatus);
      }, e => { });

  },
    [mounted, delay, vehicleId]
  );

  useEffect(() => {
    getStageHistory();
  }, [getStageHistory]);

  // Sort stages by dateAssigned
  const [order, setOrder] = useState<ListOrder>('asc');
  const sortedStageHistory = [...stageHistory].sort((a, b) => {
    let aDate = a.dateAssigned;
    let bDate = b.dateAssigned;
    if (order === 'desc') {
      if (aDate < bDate) {
        return -1;
      }
      if (aDate > bDate) {
        return 1;
      }
      return 0;
    }
    if (order === 'asc') {
      if (aDate > bDate) {
        return -1;
      }
      if (aDate < bDate) {
        return 1;
      }
      return 0;
    }
    return 0;
  });

  return (
    <ContentPaper>
      <TabContent>
        <HistoryTitleMenu order={order} setOrder={setOrder} />
        {getStageHistoryStatus === 'loading'
          ? <Skeleton variant="rectangular" width={'100%'} height={200} />
          : <HistoryTable sortedStageHistory={sortedStageHistory} />}
      </TabContent>
    </ContentPaper>
  );
}