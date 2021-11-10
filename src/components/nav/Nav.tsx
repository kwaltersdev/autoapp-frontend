// react-router-dom
import { Link } from 'react-router-dom';
// material-ui
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
// THIS PROJECT
// components
import MainMenu from './MainMenu';
import StockSearchBar from './StockSearchBar';
import UserMenu from './UserMenu';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    color: theme.titleColor.lightBlue,
    margin: theme.spacing(7.5),
    left: '0',
    top: '0',
    zIndex: 100,
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Lobster',
  },
  link: {
    textDecoration: 'none',
    color: theme.titleColor.lightBlue,
  },
  appBar: {
    backgroundColor: '#101010',
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${theme.mainMenu.width})`,
    },
  },
}));

export default function Nav(): React.ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={classes.appBar} color='transparent' position="fixed">
        <Toolbar>
          <MainMenu />
          <Typography variant="h6" component="h1" className={classes.title}>
            <Link className={classes.link} to='/'>AutoFlow</Link>
          </Typography>
          <StockSearchBar />
          <UserMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}
