// react
import { useEffect, useState } from 'react';
// mui
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import { LocalizationProvider } from "@mui/lab";
import DatePicker from '@mui/lab/DatePicker';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { FormControl } from '@mui/material';
// THIS PROJECT
// components
import { FlexCenter } from './flex';
// types
import { Set } from '../../types/misc';

const useStyles = makeStyles(theme => ({
  dialogTitle: {
    color: theme.titleColor.darkBlue,
    textAlign: 'center',
  },
  datePicker: {
    margin: theme.spacing(1),
  }
}));

interface DateRangeSelectProps {
  buttonLabel: string;
  dialogTitle: string;
  after: number | null;
  setAfter: Set<number | null>;
  before: number | null;
  setBefore: Set<number | null>;
  className?: string;
};
export default function DateRangeSelect(props: DateRangeSelectProps): React.ReactElement {
  const classes = useStyles();

  const { buttonLabel, dialogTitle, after, setAfter, before, setBefore, className } = props;
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [afterTmp, setAfterTmp] = useState<number | null>(null);
  const [beforeTmp, setBeforeTmp] = useState<number | null>(null);

  useEffect(() => {
    setAfterTmp(after);
    setBeforeTmp(before);
  }, [after, before]);

  const clearClick = () => {
    setAfterTmp(null);
    setBeforeTmp(null);
  };

  const okClick = () => {
    const after = afterTmp ? new Date(afterTmp).getTime() : null;
    const before = beforeTmp ? new Date(beforeTmp).getTime() : null;
    setAfter(after);
    setBefore(before);
    setOpenDialog(false);
  };

  return (
    <>
      <Button
        className={className}
        startIcon={<DateRangeIcon />}
        size='small'
        variant='outlined'
        onClick={() => { openDialog ? setOpenDialog(false) : setOpenDialog(true); }}
        color={(after || before) ? 'primary' : 'inherit'}
      >
        {buttonLabel}
      </Button>
      <Dialog open={openDialog} aria-labelledby='date-range-select'>
        <DialogTitle className={classes.dialogTitle}>{dialogTitle}</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FlexCenter flexDirection='column'>
              <FormControl className={classes.datePicker}>
                <DatePicker
                  clearable
                  label='Start Date'
                  value={afterTmp}
                  onChange={(newValue) => setAfterTmp(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
              <FormControl className={classes.datePicker}>
                <DatePicker
                  clearable
                  label='End Date'
                  value={beforeTmp}
                  onChange={(newValue) => setBeforeTmp(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  minDate={afterTmp}
                />
              </FormControl>
            </FlexCenter>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            size='large'
            onClick={clearClick}
          >
            CLEAR
          </Button>
          <Button
            size='large'
            onClick={okClick}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

}

