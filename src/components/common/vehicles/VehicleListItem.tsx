import { styled } from '@mui/system';
import ListItem from '@mui/material/ListItem';

const VehicleListItem = styled(ListItem)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  padding: 0,
  display: 'flex',
  justifyContent: 'space-between'
}));

export default VehicleListItem;