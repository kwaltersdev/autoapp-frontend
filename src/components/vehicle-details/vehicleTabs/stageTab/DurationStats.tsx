// material-ui
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import HistoryIcon from '@mui/icons-material/History';
import Typography from '@mui/material/Typography';
// THIS PROJECT
// components
import VehicleChip from '../../../common/vehicles/VehicleChip';
import SoldVehicleChip from '../../../common/vehicles/SoldVehicleChip';
import FormatTime from '../../../common/FormatTime';
import { FlexSpaceEvenly } from '../../../common/flex';
import { ContentPaper } from '../../../common/cardContent';
import TabContent from '../TabContent';
import { FlexCenter } from '../../../common/flex';
// types
import { DetailedVehicle } from '../../../../types/Vehicle';

const useStyles = makeStyles((theme) => ({
  table: {
    width: 'clamp(200px, 100%, 400px)',
  },
  chip: {
    minWidth: 95,
  },
}));

interface DurationStatsProps {
  vehicle: DetailedVehicle;
};
export default function DurationStats(props: DurationStatsProps): React.ReactElement {
  const classes = useStyles();
  const { vehicle } = props;
  const { status, currentStage, dateAdded, reconditionTime, forSaleTime, dateOnLot, totalSellTime } = vehicle;
  const stage = currentStage.stage.name;

  const reconditionTimeLabel = (reconditionTime
    ? <FormatTime milliseconds={reconditionTime} />
    : <FormatTime milliseconds={Date.now() - dateAdded} />);

  const stageTimeLabel = (currentStage.completeTime
    ? <FormatTime milliseconds={currentStage.completeTime} />
    : <FormatTime milliseconds={Date.now() - currentStage.dateAssigned} />);

  const onLotTimeLabel = (forSaleTime && <FormatTime milliseconds={forSaleTime} />);

  const totalSellTimeLabel = (totalSellTime && <FormatTime milliseconds={totalSellTime} />);

  return (
    <ContentPaper>
      <TabContent>
        <FlexCenter style={{ gap: 10 }}>
          <HistoryIcon color='primary' />
          <Typography variant='h6' color='primary'><strong>Duration Statistics:</strong></Typography>
        </FlexCenter>
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="stats table">
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" align="left">Total Reconditioning:</TableCell>
                <TableCell align='right'>
                  <VehicleChip
                    className={classes.chip}
                    // change the color label based on whether reconditioning was ever complete
                    // (made it For Sale, hence has a dateOnLot property)
                    color={dateOnLot ? 'primary' : 'default'}
                    label={reconditionTimeLabel}
                  />
                </TableCell>
              </TableRow>
              {status !== 'sold'
                ? <TableRow>
                  <TableCell component="th" scope="row" align="left">{stage}:</TableCell>
                  <TableCell align='right'>
                    <VehicleChip
                      className={classes.chip}
                      color={currentStage.status === 'complete' ? 'primary'
                        : currentStage.stage.name === 'Assign' ? 'secondary' : 'default'}
                      label={stageTimeLabel}
                    />
                  </TableCell>
                </TableRow>
                : forSaleTime
                  ? <TableRow >
                    <TableCell component="th" scope="row" align="left">For Sale:</TableCell>
                    <TableCell align='right'>
                      <VehicleChip
                        className={classes.chip}
                        color='primary'
                        label={onLotTimeLabel}
                      />
                    </TableCell>
                  </TableRow>
                  : <></>}
              {status === 'sold' && <TableRow >
                <TableCell component="th" scope="row" align="left">Total Time to Sell:</TableCell>
                <TableCell align='right'>
                  <SoldVehicleChip
                    className={classes.chip}
                    color='primary'
                    label={totalSellTimeLabel}
                  />
                </TableCell>
              </TableRow>}
              <TableRow>
                <TableCell align="right" size='small' colSpan={2} >
                  <FlexSpaceEvenly>
                    <Chip label='incomplete' size='small' />
                    <Chip label='complete' size='small' color='primary' />
                  </FlexSpaceEvenly>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TabContent>
    </ContentPaper>
  );
}