// material-ui
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
// THIS PROJECT
// components
import { LargeCard, LargeContent, ContentHeader } from '../common/cardContent';
import { FlexCenter } from '../common/flex';

export default function GetVehicleLoading(): React.ReactElement {
  return (
    <LargeCard>
      <LargeContent>
        <ContentHeader>
          <Skeleton />
          <Skeleton />
        </ContentHeader>
        <Divider />
        <FlexCenter flexDirection='column' sx={{ height: 300 }}>
          <CircularProgress />
          <Typography>Updating vehicle...</Typography>
        </FlexCenter>
      </LargeContent>
    </LargeCard>
  );
}