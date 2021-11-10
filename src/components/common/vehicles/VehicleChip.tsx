// material-ui
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

const VehicleChip = styled(Chip)(({
  theme
}) => ({
  margin: theme.spacing(.25),
  width: '100%',
}));

export default VehicleChip;