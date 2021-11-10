// material-ui
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';


const useStyles = makeStyles({
  timeDifferenceLabel: {
    fontSize: 10,
  },
});

interface FormatTimeProps {
  milliseconds: number;
  color?: 'primary' | 'secondary';
};
export default function FormatTime(props: FormatTimeProps): React.ReactElement {
  const classes = useStyles();

  const { milliseconds, color } = props;

  if (milliseconds < (1000 * 60)) {
    return (
      <Typography color={color ? color : 'inherit'}>
        {Math.round(milliseconds / 1000)} <span className={classes.timeDifferenceLabel}> secs</span>
      </Typography>
    );
  } else if (milliseconds < (1000 * 60 * 60)) {
    return (
      <Typography color={color ? color : 'inherit'}>
        {Math.round(milliseconds / (1000 * 60))} <span className={classes.timeDifferenceLabel}> mins</span>
      </Typography>
    );
  } else if (milliseconds < (1000 * 60 * 60 * 24)) {
    return (
      <Typography color={color ? color : 'inherit'}>
        {Math.round(milliseconds / (1000 * 60 * 60))} <span className={classes.timeDifferenceLabel}> hrs</span>
      </Typography>
    );
  } else {
    return (
      // round days to one decimal point
      <Typography color={color ? color : 'inherit'}>
        {Math.round(milliseconds / (1000 * 60 * 60 * 24) * 10) / 10} <span className={classes.timeDifferenceLabel}> days</span>
      </Typography>
    );
  };
}