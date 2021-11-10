// react
import { useState } from 'react';
// material-ui
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// THIS PROJECT
// services
import { updateVehicle, sellVehicle } from '../../services/vehicles';
// contexts
import { useDemoContext } from '../../contexts/DemoContext';
// types
import { VehicleDetailState } from '../../types/Vehicle';
import { PostRequestStatus } from '../../types/ServiceRequests';

interface ActionMenuProps {
  vehicleDetailState: VehicleDetailState;
  mounted: React.MutableRefObject<boolean>;
};
export default function ActionMenu(props: ActionMenuProps): React.ReactElement {
  const { delay } = useDemoContext();
  const { vehicleDetailState, mounted } = props;
  const { vehicle, setVehicle, setUpdateVehicleStatus } = vehicleDetailState;

  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  const trashVehicle = async () => {
    setUpdateVehicleStatus('loading');
    await delay();
    vehicle && updateVehicle(vehicle.id, { status: 'trash' })
      .then(result => {
        mounted.current && setUpdateVehicleStatus(result.status as PostRequestStatus);
        result.status === 'success' && mounted.current && setVehicle(result.doc);
        result.status === 'failed' && console.error(result);
      }, e => {
        mounted.current && setUpdateVehicleStatus('failed');
        console.error(e);
      });
  };

  const sellVehicleClick = async () => {
    setUpdateVehicleStatus('loading');
    await delay();
    vehicle && sellVehicle(vehicle.id, vehicle.currentStage.id, Date.now())
      .then(result => {
        mounted.current && setUpdateVehicleStatus(result.status as PostRequestStatus);
        if (result.status === 'success' && mounted.current) {
          setVehicle(result.doc);
        }
        result.status === 'failed' && console.error(result);
      }, e => {
        mounted.current && setUpdateVehicleStatus('failed');
        console.error(e);
      });
  };

  return (
    <div>
      <IconButton
        aria-controls='action-menu'
        aria-haspopup='true'
        onClick={handleMenuClick}
        size="large">
        <MoreVertIcon />
      </IconButton>
      <Menu
        id='action-menu'
        anchorEl={anchorMenu}
        keepMounted
        open={Boolean(anchorMenu)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={trashVehicle}>
          <ListItemIcon><DeleteIcon /> </ListItemIcon>
          <ListItemText>Trash</ListItemText>
        </MenuItem>
        {vehicle && vehicle.status !== 'sold' &&
          <MenuItem onClick={sellVehicleClick}>
            <ListItemIcon><AttachMoneyIcon /> </ListItemIcon>
            <ListItemText>Sell</ListItemText>
          </MenuItem>}
      </Menu>
    </div>
  );
}