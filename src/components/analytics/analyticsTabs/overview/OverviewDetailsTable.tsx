// material-ui
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// THIS PROJECT
// components
import VehicleChip from '../../../common/vehicles/VehicleChip';
import SoldVehicleChip from '../../../common/vehicles/SoldVehicleChip';
import FormatTime from '../../../common/FormatTime';
// types
import { VehicleTurnStats } from '../../../../types/Statistics';

const useStyles = makeStyles({
  chip: {
    minWidth: 95,
  },
});

interface OverviewDetailsTableProps {
  turnStatistics: VehicleTurnStats;
};
export default function OverviewDetailsTable(props: OverviewDetailsTableProps): React.ReactElement {
  const classes = useStyles();
  const { count, average, median, mode } = props.turnStatistics;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="overview stats table">
        <TableHead>
          <TableRow>
            <TableCell>Overview</TableCell>
            <TableCell align='center'>Average</TableCell>
            <TableCell align='center'>Median</TableCell>
            <TableCell align='center'>Mode (days)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row" align="left">
              Become For Sale ({count.getForSale}):
            </TableCell>
            <TableCell align='center'>
              <VehicleChip
                className={classes.chip}
                color='primary'
                label={<FormatTime milliseconds={average.getForSale} />}
              />
            </TableCell>
            <TableCell align='center'>
              <VehicleChip
                className={classes.chip}
                color='primary'
                label={<FormatTime milliseconds={median.getForSale} />}
              />
            </TableCell>
            <TableCell align='center'>
              <VehicleChip
                className={classes.chip}
                color='primary'
                label={`${mode.getForSale} / ${mode.getForSalePercent}%`}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" align="left">
              To Be Sold ({count.getSold}):
            </TableCell>
            <TableCell align='center'>
              <SoldVehicleChip
                className={classes.chip}
                label={<FormatTime milliseconds={average.getSold} />}
              />
            </TableCell>
            <TableCell align='center'>
              <SoldVehicleChip
                className={classes.chip}
                label={<FormatTime milliseconds={median.getSold} />}
              />
            </TableCell>
            <TableCell align='center'>
              <SoldVehicleChip
                className={classes.chip}
                label={`${mode.getSold} / ${mode.getSoldPercent}%`}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row" align="left">
              Total Turn Time ({count.total}):
            </TableCell>
            <TableCell align='center'>
              <VehicleChip
                className={classes.chip}
                label={<FormatTime milliseconds={average.total} />}
              />
            </TableCell>
            <TableCell align='center'>
              <VehicleChip
                className={classes.chip}
                label={<FormatTime milliseconds={median.total} />}
              />
            </TableCell>
            <TableCell align='center'>
              <VehicleChip
                className={classes.chip}
                label={`${mode.total} / ${mode.totalPercent}%`}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}