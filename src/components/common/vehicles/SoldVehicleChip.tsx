// material-ui
import { styled } from '@mui/material/styles';
// THIS PROJECT
// components
import VehicleChip from './VehicleChip';

const SoldVehicleChip = styled(VehicleChip)(({
  theme
}) => ({
  backgroundColor: theme.palette.success.main,
  color: theme.palette.success.contrastText
}));

export default SoldVehicleChip;