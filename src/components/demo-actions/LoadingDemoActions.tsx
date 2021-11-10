// material-ui
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import { Typography } from '@mui/material';
// THIS PROJECT
// components
import { FlexCenter, FlexSpaceAround } from '../common/flex';
// types
import { GetRequestStatus, PostRequestStatus } from '../../types/ServiceRequests';

const LoadingFlexSpaceAround = styled(FlexSpaceAround)(({ theme }) => ({
  height: 200,
}));

interface LoadingDemoActionsProps {
  loading: boolean;
  clearDatabaseStatus: GetRequestStatus;
  addVehicleDescriptorsStatus: PostRequestStatus;
  addStagesStatus: PostRequestStatus;
  generateVehiclesStatus: PostRequestStatus;
}
export default function LoadingDemoActions(props: LoadingDemoActionsProps): React.ReactElement {
  const {
    loading,
    clearDatabaseStatus,
    addVehicleDescriptorsStatus,
    addStagesStatus,
    generateVehiclesStatus
  } = props;

  return (
    <Dialog open={loading} fullWidth={true} >
      <LoadingFlexSpaceAround flexDirection='column'>
        <CircularProgress />
        <FlexCenter flexDirection='column' sx={{ textAlign: 'center' }}>
          {clearDatabaseStatus === 'loading' && <Typography>...Clearing Database</Typography>}
          {addVehicleDescriptorsStatus === 'loading' && <Typography>...Adding Vehicle Descriptors</Typography>}
          {addStagesStatus === 'loading' && <Typography>...Adding Stages/People/Places</Typography>}
          {generateVehiclesStatus === 'loading' && <>
            <Typography>...Generating Vehicles</Typography>
            <Typography>(this could take several minutes)</Typography>
          </>}
        </FlexCenter>
      </LoadingFlexSpaceAround>
    </Dialog>
  );
}