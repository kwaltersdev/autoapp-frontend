// material-ui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const TabContent = styled(Box)(({
  theme
}) => ({
  display: 'flex',
  p: 1,
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'start',
  flexDirection: 'column',
  margin: 'auto',
  width: 'clamp(200px, 100%, 600px)',
  minHeight: '200px',
}));

export default TabContent;