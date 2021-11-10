// material-ui
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
// THIS PROJECT
// components
import AssignStage from './AssignStage';
import SellVehicleButtons from './SellVehicleButtons';
import CompleteStageButton from './CompleteStageButton';
import { ContentPaper } from '../../../common/cardContent';
import TabContent from '../TabContent';
import { FlexCenter } from '../../../common/flex';
// types
import { VehicleDetailState } from '../../../../types/Vehicle';

const useStyles = makeStyles((theme) => ({
  sold: {
    color: theme.palette.success.main,
  },
  content: {
    width: 'clamp(200px, 100%, 500px)',
  },
  flexDivider: {
    width: 'clamp(200px, 100%, 400px)',
    height: 1,
    margin: 'auto',
    marginTop: 5
  }
}));

interface CurrentStageProps {
  vehicleDetailState: VehicleDetailState;
};
export default function CurrentStage(props: CurrentStageProps): React.ReactElement {
  const classes = useStyles();
  const { vehicleDetailState } = props;
  const { vehicle } = vehicleDetailState;
  const currentStage = vehicle?.currentStage;
  const stage = currentStage?.stage.name;
  const personPlace = currentStage?.personPlace.name;

  const dateSoldDisplay = (vehicle?.dateSold && new Date(vehicle.dateSold));

  return (
    <ContentPaper>
      <TabContent>
        <FlexCenter flexDirection='column' className={classes.content}>
          {vehicle?.status === 'sold'
            ? <>
              <Typography className={classes.sold} variant='h6'><strong>Sold</strong></Typography>
              <Typography variant='subtitle1'>{dateSoldDisplay && dateSoldDisplay.toLocaleDateString()}</Typography>
            </>
            : currentStage?.status === 'complete'
              ? <>
                <Typography variant='h6' color='primary'><strong>Assign</strong></Typography>
              </>
              : <>
                <Typography variant='h6' color='primary'><strong>{stage}</strong></Typography>
                <Typography variant='h6'>{personPlace}</Typography>
              </>
          }
          {vehicle?.status !== 'sold' && <Divider className={classes.flexDivider} flexItem />}
        </FlexCenter>
        {vehicle?.status === 'sold' ? <></>
          : (stage === 'Assign' || currentStage?.status === 'complete')
            ? <AssignStage vehicleDetailState={vehicleDetailState} />
            : stage === 'For Sale'
              ? <SellVehicleButtons vehicleDetailState={vehicleDetailState} />
              // task list
              : <>
                {vehicle && vehicle.currentStage.tasks.length >= 1 && <FlexCenter sx={{ flexDirection: 'column', width: 'clamp(200px, 100%, 400px)' }}>
                  <Typography sx={{ textAlign: 'center' }}>Tasks:</Typography>
                  <List dense sx={{ paddingLeft: 3, paddingRight: 3 }}>
                    {vehicle?.currentStage.tasks.map(task => <ListItem disablePadding key={task[0] + Math.random().toString()} sx={{ overflowWrap: 'break-word' }}>
                      <ListItemIcon><ArrowRightRoundedIcon /></ListItemIcon>
                      <ListItemText primary={task} />
                    </ListItem>)}
                  </List>
                  <Divider flexItem />
                </FlexCenter>}
                <CompleteStageButton vehicleDetailState={vehicleDetailState} />
              </>
        }
      </TabContent>
    </ContentPaper >
  );
}