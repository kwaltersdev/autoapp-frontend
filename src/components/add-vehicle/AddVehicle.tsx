// material-ui
import makeStyles from '@mui/styles/makeStyles';
import AddIcon from '@mui/icons-material/Add';
// THIS PROJECT
// components
import { SmallCard, SmallContent, ContentHeader, IconContentTitle, ContentPaper } from '../common/cardContent';
import Divider from '@mui/material/Divider';
import AddVehicleInputs from './AddVehicleInputs';

const useStyles = makeStyles(theme => ({
  addVehicle: {
    margin: 'auto',
  }
}));

export default function AddVehicle(): React.ReactElement {
  const classes = useStyles();

  return (
    <SmallCard className={classes.addVehicle}>
      <SmallContent>
        <ContentHeader>
          <IconContentTitle icon={<AddIcon color='primary' />} variant='h5'>Add Vehicle</IconContentTitle>
          <Divider />
        </ContentHeader>
        <ContentPaper>
          <AddVehicleInputs />
        </ContentPaper>
      </SmallContent>
    </SmallCard>
  );
}