// material-ui
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
// THIS PROJECT
// components
import { LargeCard, LargeContent, ContentHeader } from '../common/cardContent';

export default function GetVehicleLoading(): React.ReactElement {
  return (
    <LargeCard>
      <LargeContent>
        <ContentHeader>
          <Skeleton />
          <Skeleton />
        </ContentHeader>
        <Divider />
        <Skeleton variant="rectangular" height={300} />
      </LargeContent>
    </LargeCard>
  );
}