// react
import { useState, useEffect } from 'react';
// react-router-dom
import { Link, useLocation } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Hidden from '@mui/material/Hidden';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LaptopIcon from '@mui/icons-material/Laptop';
import SettingsIcon from '@mui/icons-material/Settings';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    fontFamily: 'Lobster',
    color: theme.titleColor.darkBlue,
  },
  menuItems: {
    width: theme.mainMenu.width,
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
}));

// React automatically includes window prop, so we don't need to include it as a prop when we call this component
interface MainMenuProps {
  window?: () => Window;
};
export default function MainMenu(props: MainMenuProps): React.ReactElement {
  const { window } = props;
  const classes = useStyles();
  const location = useLocation();

  //OPENING THE MENU
  const [openMenu, setOpenMenu] = useState(false);
  const container = window !== undefined ? () => window().document.body : undefined;

  const toggleDrawer = (open: any) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    };

    setOpenMenu(open);
  };

  // DISPLAYING SELECTION
  type Selection = '/all-vehicles' | '/add-vehicle' | '/stages' | '/people-places' | '/analytics' | '/demo-actions' | '/demo-settings';
  const [selection, setSelection] = useState<Selection>('/all-vehicles');

  useEffect(() => {
    const regex = /(\/[\w-]+)/;
    const match = location!.pathname.match(regex);
    match && setSelection(match[1] as Selection);
  }, [location, setSelection]);

  // MENU ITEMS
  const menuItems = (
    <div
      className={classes.menuItems}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Hidden lgUp>
        <Link className={classes.link} to='/'>
          <ListItem button>
            <Typography variant="h6" component="h2" className={classes.title}>
              AutoApp
            </Typography>
          </ListItem>
        </Link>
      </Hidden>
      <Divider />
      <Link className={classes.link} to='/all-vehicles/active/asc/10/first/0'>
        <ListItem
          button
          selected={selection === '/all-vehicles'}
        >
          <ListItemIcon><VisibilityIcon /></ListItemIcon>
          <ListItemText>All Vehicles</ListItemText>
        </ListItem>
      </Link>
      <Link className={classes.link} to='/add-vehicle'>
        <ListItem
          button
          selected={selection === '/add-vehicle'}
        >
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText>Add Vehicle</ListItemText>
        </ListItem>
      </Link>
      <Divider />
      <Link className={classes.link} to='/stages'>
        <ListItem
          button
          selected={selection === '/stages'}
        >
          <ListItemIcon><VisibilityIcon /></ListItemIcon>
          <ListItemText>Stages</ListItemText>
        </ListItem>
      </Link>
      <Link className={classes.link} to='/people-places'>
        <ListItem
          button
          selected={selection === '/people-places'}
        >
          <ListItemIcon><VisibilityIcon /></ListItemIcon>
          <ListItemText>People/Places</ListItemText>
        </ListItem>
      </Link>
      <Divider />
      <Link className={classes.link} to='/analytics/overview'>
        <ListItem
          button
          selected={selection === '/analytics'}
        >
          <ListItemIcon><EqualizerIcon /></ListItemIcon>
          <ListItemText>Analytics</ListItemText>
        </ListItem>
      </Link>
      <Divider />
      <Link className={classes.link} to='/demo-actions'>
        <ListItem
          button
          selected={selection === '/demo-actions'}
        >
          <ListItemIcon><LaptopIcon /></ListItemIcon>
          <ListItemText>Demo Actions</ListItemText>
        </ListItem>
      </Link>
      <Link className={classes.link} to='/demo-settings'>
        <ListItem
          button
          selected={selection === '/demo-settings'}
        >
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText>Demo Settings</ListItemText>
        </ListItem>
      </Link>
      <Divider />
    </div >
  );

  return <>
    <IconButton
      edge="start"
      className={classes.menuButton}
      color="inherit"
      aria-label="menu"
      onClick={toggleDrawer(true)}
      size="large">
      <MenuIcon />
    </IconButton>
    <nav>
      <Hidden lgUp implementation='css'>
        <Drawer container={container} anchor={'left'} open={openMenu} onClose={toggleDrawer(false)}>
          {menuItems}
        </Drawer>
      </Hidden>
      <Hidden lgDown implementation='css'>
        <Drawer variant='permanent' open>
          {menuItems}
        </Drawer>
      </Hidden>
    </nav>
  </>;
};;