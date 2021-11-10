// react
import { useState } from 'react';
// material-ui
import Tabs from '@mui/material/Tabs';
// THIS PROJECT
// components
import DarkTab from '../../../common/DarkTab';
import CurrentStage from './CurrentStage';
import DurationStats from './DurationStats';
// types
import { VehicleDetailState } from '../../../../types/Vehicle';

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
      id={`stage-tabpanel-${index}`}
      aria-labelledby={`stage-tab-${index}`}
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
    id: `stage-tab-${index}`,
    'aria-controls': `vehicle-tabpanel-${index}`,
  };
};

interface StageTabsProps {
  vehicleDetailState: VehicleDetailState;
};
export default function StageTabs(props: StageTabsProps): React.ReactElement {
  const { vehicleDetailState } = props;
  const { vehicle } = vehicleDetailState;
  const [tabValue, setTabValue] = useState<'current' | 'stats'>('current');

  const changeTab = (event: React.ChangeEvent<{}>, newValue: 'current' | 'stats') => {
    setTabValue(newValue);
  };

  return (
    <div>
      <Tabs
        centered
        value={tabValue}
        indicatorColor='primary'
        textColor='primary'
        onChange={changeTab}
        aria-label='current stage navigation'
      >
        <DarkTab label='Current Stage' value='current' {...a11yProps('current')} />
        <DarkTab label='Duration Stats' value='stats' {...a11yProps('stats')} />
      </Tabs>
      <TabPanel value={tabValue} index='current'>
        <CurrentStage vehicleDetailState={vehicleDetailState} />
      </TabPanel>
      <TabPanel value={tabValue} index='stats'>
        {vehicle && <DurationStats vehicle={vehicle} />}
      </TabPanel>
    </div>
  );
}