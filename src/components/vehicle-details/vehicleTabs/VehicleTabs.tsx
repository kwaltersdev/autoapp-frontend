// react
import { useState, useEffect } from 'react';
// react-router-dom
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '../../../hooks';
// material-ui
import Tabs from '@mui/material/Tabs';
// THIS PPROJECT
// components
import DarkTab from '../../common/DarkTab';
import StageTab from './stageTab/StageTab';
import InfoTab from './infoTab/InfoTab';
import NotesTab from './notesTab/NotesTab';
import StageHistoryTab from './stageHistoryTab/StageHistoryTab';
// types
import { VehicleDetailState, VehicleStatus } from '../../../types/Vehicle';

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
      id={`vehicle-tabpanel-${index}`}
      aria-labelledby={`vehicle-tab-${index}`}
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
    id: `vehicle-tab-${index}`,
    'aria-controls': `vehicle-tabpanel-${index}`,
  };
};

interface VehicleTabsProps {
  vehicleDetailState: VehicleDetailState;
};
export default function VehicleTabs(props: VehicleTabsProps): React.ReactElement {
  const history = useHistory();
  const query = useQuery();
  const { vehicleDetailState } = props;
  const { vehicle } = vehicleDetailState;

  interface ParamTypes {
    status: VehicleStatus;
    tab: 'stage' | 'info' | 'notes' | 'history';
  };

  let { tab } = useParams<ParamTypes>();
  const [tabValue, setTabValue] = useState<any>(tab);

  useEffect(() => setTabValue(tab), [tab]);

  const changeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
    setTabValue(newValue);
    // check if we have a 'prev' query parameter,if we do set previous to the trimmed path, if not set it to ''
    const previous = query.get('prev')
      ? window.location.href.replace(/.*(?=prev=)(prev=)/, '')
      : '';
    history.push(`/vehicle-details/id/${vehicle?.id}/${newValue}?prev=${previous}`);
  };

  return (
    <div>
      <Tabs
        centered
        value={tabValue}
        indicatorColor="primary"
        textColor="primary"
        onChange={changeTab}
        aria-label="vehicle details navigation"
      >
        <DarkTab label="Stage" value='stage' {...a11yProps('stage')} />
        <DarkTab label="Info" value='info' {...a11yProps('info')} />
        <DarkTab label="Notes" value='notes' {...a11yProps('notes')} />
        <DarkTab label="History" value='history' {...a11yProps('history')} />
      </Tabs>
      <TabPanel value={tabValue} index='stage'>
        <StageTab vehicleDetailState={vehicleDetailState} />
      </TabPanel>
      <TabPanel value={tabValue} index='info'>
        <InfoTab vehicleDetailState={vehicleDetailState} />
      </TabPanel>
      <TabPanel value={tabValue} index='notes'>
        <NotesTab vehicleDetailState={vehicleDetailState} />
      </TabPanel>
      <TabPanel value={tabValue} index='history'>
        {vehicle && <StageHistoryTab vehicleId={vehicle.id} />}
      </TabPanel>
    </div>
  );
}