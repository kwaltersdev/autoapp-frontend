// react
import { useState } from 'react';
// material-ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
// THIS PROJECT
// components
import FormatTime from '../../../common/FormatTime';
import StageDetailsDialog from './StageDetailsDialog';
// types
import { StageAssignment } from '../../../../types/StageAssignment';

const useStyles = makeStyles({
  tableContainer: {
    width: 'clamp(200px, 100%, 600px)',
  },
  table: {
    minWidth: 450,
    backgroundColor: '#F9F9F9',
  },
  stageButton: {
    width: 75,
    textAlign: 'left',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

interface HistoryTableProps {
  sortedStageHistory: StageAssignment[];
};
export default function HistoryTable(props: HistoryTableProps): React.ReactElement {
  const classes = useStyles();
  const { sortedStageHistory } = props;

  const formatDateAssigned = (dateAssigned: number) => {
    const date: Date = new Date(dateAssigned);
    interface DateTimeFormatOptions {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    };
    let options: DateTimeFormatOptions = {
      year: '2-digit', month: '2-digit', day: '2-digit'
    };
    return <span>{date.toLocaleDateString('en-US', options)}</span>;
  };

  const timeElapsed = (dateAssigned: number, status: string, completeTime: number) => {
    if (status === 'complete') {
      return <FormatTime color='primary' milliseconds={completeTime} />;
    } else {
      const difference: number = Date.now() - dateAssigned;
      return <FormatTime color='secondary' milliseconds={difference} />;
    };
  };

  const [openStageDetailsDialog, setOpenStageDetailsDialog] = useState<boolean>(false);
  const [dialogStageAssignment, setDialogStageAssignment] = useState<StageAssignment | undefined>();

  const handleStageDetailsClick = (stageAssignment: StageAssignment) => {
    setDialogStageAssignment(stageAssignment);
    setOpenStageDetailsDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenStageDetailsDialog(false);
    setDialogStageAssignment(undefined);
  };

  return (
    <>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table className={classes.table} size='small' aria-label="stage history table">
          <TableHead>
            <TableRow>
              <TableCell>Stage</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Person/Place</TableCell>
              <TableCell>Assigned</TableCell>
              <TableCell>Completed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStageHistory.map((stage) => (
              <TableRow key={stage.dateAssigned}>
                <TableCell component="th" scope="row">
                  <Button
                    size='small'
                    color={stage.status === 'incomplete' ? 'secondary' : 'inherit'}
                    onClick={() => handleStageDetailsClick(stage)}
                  >
                    <span className={classes.stageButton}>{stage.stage.name}</span>
                  </Button>
                </TableCell>
                <TableCell>{timeElapsed(stage.dateAssigned, stage.status, stage.completeTime)}</TableCell>
                <TableCell>{stage.personPlace.name}</TableCell>
                <TableCell component="th" scope="row">{formatDateAssigned(stage.dateAssigned)}</TableCell>
                <TableCell>{stage.dateCompleted > 0 && formatDateAssigned(stage.dateCompleted)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {dialogStageAssignment &&
        <StageDetailsDialog
          open={openStageDetailsDialog}
          onClose={handleCloseDialog}
          stageAssignment={dialogStageAssignment}
          timeElapsed={timeElapsed}
        />}
    </>
  );
}