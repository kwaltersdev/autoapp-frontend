// material-ui
import LaptopIcon from '@mui/icons-material/Laptop';
import Divider from '@mui/material/Divider';
// THIS PROJECT
// components
import { LargeCard, LargeContent, ContentHeader, IconContentTitle } from '../common/cardContent';
import ActionCheckBoxes from './ActionCheckBoxes';

export default function DemoActions(): React.ReactElement {

  return (
    <LargeCard>
      <LargeContent>
        <ContentHeader>
          <IconContentTitle icon={<LaptopIcon color='primary' />} variant='h5'>Demo Actions</IconContentTitle>
          <Divider />
        </ContentHeader>
        <ActionCheckBoxes />
      </LargeContent>
    </LargeCard>
  );
}