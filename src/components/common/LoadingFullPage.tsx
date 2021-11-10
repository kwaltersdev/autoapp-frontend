// material-ui
import CircularProgress from '@mui/material/CircularProgress';
import makeStyles from '@mui/styles/makeStyles';
// THIS PROJECT
// components
import { FlexCenter } from './flex';

const useStyles = makeStyles({
  flexCenter: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    backgroundColor: 'black',
    opacity: 0.5,
    zIndex: 100,
  },
});

export default function LoadingFullPage(): React.ReactElement {
  const classes = useStyles();

  return (
    <FlexCenter className={classes.flexCenter}>
      <CircularProgress />
    </FlexCenter>
  );
}