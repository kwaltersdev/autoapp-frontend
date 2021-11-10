// CSS
import './App.css';
// react
import React from 'react';
// react-router-dom
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// material-ui
import makeStyles from '@mui/styles/makeStyles';
// THIS PROJECT
// components
import Nav from '../nav/Nav';
import PrivateRoute from './PrivateRoute';
import LogIn from '../log-in/LogIn';
import AllVehicles from '../all-vehicles/AllVehicles';
import AddVehicle from '../add-vehicle/AddVehicle';
import VehicleDetails from '../vehicle-details/VehicleDetails';
import PeoplePlaces from '../people-places/PeoplePlaces';
import Stages from '../stages/Stages';
import Analytics from '../analytics/Analytics';
import DemoActions from '../demo-actions/DemoActions';
import DemoSettings from '../demo-settings/DemoSettings';
// hooks
import { useAuthContext } from '../../contexts/AuthContext';

const useStyles = makeStyles((theme) => ({
  app: {
    fontFamily: 'Roboto',
    backgroundColor: '#404040',
    minHeight: '100vh',
    minWidth: '100vw',
    position: 'absolute',
    left: '0',
    top: '0',
  },
}));

export default function App(): React.ReactElement {
  const classes = useStyles();
  const { currentUser } = useAuthContext();

  return (
    <div className={classes.app}>
      <Router>
        {currentUser && <Nav />}
        <Switch>
          <Route exact path='/'>
            <Redirect to='/all-vehicles/active/asc/10/first/0' />
          </Route>
          <Route path='/log-in' component={LogIn} />
          <PrivateRoute path='/all-vehicles/:statusParam/:sortParam/:perPageParam/:pageParam/:compareParam' component={AllVehicles} />
          <PrivateRoute path='/add-vehicle' component={AddVehicle} />
          <PrivateRoute path='/vehicle-details/:searchCriteria/:searchValue/:tab' component={VehicleDetails} />
          <PrivateRoute path='/people-places' component={PeoplePlaces} />
          <PrivateRoute path='/stages' component={Stages} />
          <PrivateRoute path='/analytics/:tab' component={Analytics} />
          <PrivateRoute path='/demo-actions' component={DemoActions} />
          <PrivateRoute path='/demo-settings' component={DemoSettings} />
        </Switch>
      </Router>
    </div>
  );
}

