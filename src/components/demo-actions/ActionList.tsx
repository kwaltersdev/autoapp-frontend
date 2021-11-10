// material-ui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
// THIS PROJECT
// types
import { DemoState } from '../../types/Demo';

interface ActionListProps {
  demoState: DemoState;
};
export default function ActionList(props: ActionListProps): React.ReactElement {
  const {
    clearDatabase,
    addVehicleDescriptors,
    addStages,
    generateVehicles,
  } = props.demoState;

  const clearDatabaseLi: JSX.Element = (
    <ListItem>
      <ListItemIcon><DeleteForeverIcon color='secondary' /></ListItemIcon>
      <ListItemText primary='Clear Database' />
    </ListItem>
  );

  const addVehicleDescriptorsLi: JSX.Element = (
    <ListItem>
      <ListItemIcon><CreateNewFolderIcon color='primary' /></ListItemIcon>
      <ListItemText primary='Add Vehicle Descriptors' />
    </ListItem>
  );

  const addStagesLi: JSX.Element = (
    <ListItem>
      <ListItemIcon><CreateNewFolderIcon color='primary' /></ListItemIcon>
      <ListItemText primary='Add Stages and People/Places' />
    </ListItem>
  );

  const generateVehiclesLi: JSX.Element = (
    <ListItem>
      <ListItemIcon><CreateNewFolderIcon color='primary' /></ListItemIcon>
      <ListItemText primary='Generate Demo Vehicles' />
    </ListItem>
  );

  return (
    <List id='demo-dialog-description'>
      {clearDatabase && clearDatabaseLi}
      {addVehicleDescriptors && addVehicleDescriptorsLi}
      {addStages && addStagesLi}
      {generateVehicles && generateVehiclesLi}
    </List>
  );
}