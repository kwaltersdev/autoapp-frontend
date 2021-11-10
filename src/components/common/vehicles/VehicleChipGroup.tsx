// material-ui
import { styled } from '@mui/material/styles';

const VehicleChipGroup = styled('div')({
  float: 'right',
  height: '90%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  flexDirection: 'column',
  width: 'clamp(100px, 35%, 150px)',
});

export default VehicleChipGroup;