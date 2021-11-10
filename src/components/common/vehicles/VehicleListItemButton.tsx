import { styled } from '@mui/system';
import ListItemButton from '@mui/material/ListItemButton';

const VehicleListItemButton = styled(ListItemButton)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  padding: 0,
  display: 'flex',
  justifyContent: 'space-between'
}));

export default VehicleListItemButton;