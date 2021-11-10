// material-ui
import makeStyles from '@mui/styles/makeStyles';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
// THIS PROJECT
// types
import { StageAssignment } from '../../../../types/StageAssignment';

const useStyles = makeStyles({
  dialog: {
    padding: 20,
    textAlign: 'left',
    width: 'clamp(200px, 80vw, 400px)',
    marginTop: -50,
  },
  closeButton: {
    float: 'right',
  },
  label: {
    fontSize: 10,
    float: 'left',
    width: '100%',
    marginTop: 10,
  },

});

interface StageDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  stageAssignment: StageAssignment;
  timeElapsed: (dateAssigned: number, status: string, completeTime: number) => JSX.Element;
};
export default function AddVehicleDialog(props: StageDetailsDialogProps): React.ReactElement {
  const classes = useStyles();
  const { onClose, open, stageAssignment, timeElapsed } = props;
  const stage = stageAssignment.stage.name;
  const personPlace = stageAssignment.personPlace.name;

  const handleClose = () => {
    onClose();
  };

  const formatDate = (dateAssigned: number) => {
    const date: Date = new Date(dateAssigned);
    interface DateTimeFormatOptions {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit';
    };
    let options: DateTimeFormatOptions = {
      year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
    };
    return <span>{date.toLocaleDateString('en-US', options)}</span>;
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="stage-details-dialog" open={open}>
      <div>
        <IconButton className={classes.closeButton} onClick={handleClose} size="large">
          <CloseIcon />
        </IconButton>
      </div>
      <div className={classes.dialog}>
        <div className={classes.label}>Stage:</div>
        <Typography variant="subtitle1">{stage}</Typography>
        <Divider />
        <span className={classes.label}>Person/Place:</span>
        <Typography variant="subtitle1">{personPlace}</Typography>
        <Divider />
        <span className={classes.label}>Status:</span>
        <Typography variant="subtitle1">{stageAssignment.status}</Typography>
        <Divider />
        <span className={classes.label}>Tasks: </span>
        <List>
          {stageAssignment.tasks.map(task => <ListItem key={task + Math.random()}>{task}</ListItem>)}
        </List>
        <Divider />
        <span className={classes.label}>Date Assigned:</span>
        <Typography variant="subtitle1">{formatDate(stageAssignment.dateAssigned)}</Typography>
        <Divider />
        {stageAssignment.dateCompleted > 0 && <>
          <span className={classes.label}>Date Completed:</span>
          <Typography variant="subtitle1">{formatDate(stageAssignment.dateCompleted)}</Typography>
        </>}
        <Divider />
        <span className={classes.label}>{stageAssignment.status === 'complete' ? 'Time to Complete' : 'Time Elapsed'}</span>
        <Typography variant="subtitle1">{timeElapsed(stageAssignment.dateAssigned, stageAssignment.status, stageAssignment.completeTime)}</Typography>
        <Divider />
      </div>
    </Dialog >
  );
}