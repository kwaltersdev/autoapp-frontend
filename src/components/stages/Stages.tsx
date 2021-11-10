// react
import { useEffect, useState, useCallback } from 'react';
// material-ui
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import Visibility from '@mui/icons-material/Visibility';
// THIS PROJECT
// components
import CenteredError from '../common/CenteredError';
import LoadingList from '../common/LoadingList';
import { LargeCard, LargeContent, ContentHeader, IconContentTitle } from '../common/cardContent';
import { FlexEnd } from '../common/flex';
import AccordianVehicleList from '../common/vehicles/AccordianVehicleList';
import ReorderStages from './ReorderStages';
// hooks
import { useCheckMounted } from '../../hooks';
// services
import { getStageVehicleCounts as getStageVehicleCountsService } from '../../services/stages';
// contexts
import { useDemoContext } from '../../contexts/DemoContext';
// types
import { GetRequestStatus } from '../../types/ServiceRequests';
import { StageVehicleCount } from '../../types/Stage';

export default function Stages(): React.ReactElement {
  const mounted = useCheckMounted();
  const { delay } = useDemoContext();

  // Get Stages
  const [stages, setStages] = useState<StageVehicleCount[]>([]);
  const [getStagesStatus, setGetStagesStatus] = useState<GetRequestStatus>('loading');

  const getStageVehicleCounts = useCallback(
    async () => {
      setGetStagesStatus('loading');
      await delay();
      getStageVehicleCountsService()
        .then(result => {
          mounted.current && setGetStagesStatus(result.status as GetRequestStatus);
          mounted.current && result.status === 'success' && result.data && setStages(result.data);
          result.status === 'failed' && console.error(result);
        }, e => {
          mounted.current && setGetStagesStatus('failed');
          console.error(e);
        });
    }, [delay, mounted]
  );

  useEffect(() => { getStageVehicleCounts(); }, [getStageVehicleCounts]);

  // for opening Reorder Stages 
  const [reorderStages, setReorderStages] = useState<boolean>(false);

  const reorderClick = () => {
    setReorderStages(reorderStages ? false : true);
  };

  let list: JSX.Element;
  if (getStagesStatus === 'failed') {
    list = <CenteredError errorMessage='Error loading Stages view...' retryAction={() => window.location.reload()} />;
  } else if (getStagesStatus === 'loading') {
    list = <LoadingList skeletonCount={10} />;
  } else if (reorderStages) {
    list = (
      <ReorderStages
        setReorderStages={setReorderStages}
        getStageVehicleCounts={getStageVehicleCounts}
      />
    );
  } else {
    list = <AccordianVehicleList variant='stages' accordianTitles={stages} />;
  };

  return (
    <LargeCard>
      <LargeContent>
        <ContentHeader>
          <IconContentTitle icon={<Visibility color='primary' />} variant='h5'>Stages</IconContentTitle>
          <Divider />
        </ContentHeader>
        <FlexEnd>
          <Button
            startIcon={<ImportExportIcon />}
            onClick={reorderClick}
          >
            reorder
          </Button>
        </FlexEnd>
        {list}
      </LargeContent>
    </LargeCard>
  );
}