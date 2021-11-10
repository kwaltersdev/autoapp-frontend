// react
import { useState, useEffect } from 'react';
// react-router-dom
import { useHistory, useParams } from 'react-router-dom';
// material-ui
import Tabs from '@mui/material/Tabs';
// THIS PROJECT
// components
import DarkTab from '../../common/DarkTab';
import OverviewStats from './overview/OverviewStats';
import StagesStats from './StagesStats';
import PeoplePlacesStats from './PeoplePlacesStats';
// types
import { VehicleTurnStats } from '../../../types/Statistics';
import { GetRequestStatus } from '../../../types/ServiceRequests';


interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
};
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
};

function a11yProps(index: any) {
  return {
    id: `analytics-tab-${index}`,
    'aria-controls': `analytics-tabpanel-${index}`,
  };
};

interface AnalyticsTabsProps {
  turnStatistics: VehicleTurnStats | null;
  getTurnStatsStatus: GetRequestStatus;
};
export default function AnalyticsTabs(props: AnalyticsTabsProps): React.ReactElement {
  const history = useHistory();

  const { turnStatistics, getTurnStatsStatus } = props;

  interface ParamTypes {
    tab: 'overview' | 'stages' | 'peoplePlaces';
  };

  let { tab } = useParams<ParamTypes>();
  const [tabValue, setTabValue] = useState<any>(tab);

  useEffect(() => setTabValue(tab), [tab]);

  const changeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
    history.push(`/analytics/${newValue}`);
  };

  return (
    <div>
      <Tabs
        centered
        value={tabValue}
        indicatorColor='primary'
        textColor='primary'
        onChange={changeTab}
        aria-label='vehicle details navigation'
      >
        <DarkTab label='Overview' value='overview' {...a11yProps('overview')} />
        <DarkTab label='Stages' value='stages' {...a11yProps('stages')} />
        <DarkTab label='People/Places' value='peoplePlaces' {...a11yProps('peoplePlaces')} />
      </Tabs>
      <TabPanel value={tabValue} index='overview'>
        <OverviewStats turnStatistics={turnStatistics} getTurnStatsStatus={getTurnStatsStatus} />
      </TabPanel>
      <TabPanel value={tabValue} index='stages'>
        <StagesStats forSaleAvg={turnStatistics ? turnStatistics.average.getForSale : 0} />
      </TabPanel>
      <TabPanel value={tabValue} index='peoplePlaces'>
        <PeoplePlacesStats />
      </TabPanel>
    </div>
  );
};
