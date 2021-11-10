// material-ui
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const FlexCenter = styled(Box)({
  display: 'flex',
  p: 1,
  justifyContent: 'center',
  alignItems: 'center'
});

export const FlexSpaceBtwn = styled(Box)({
  display: 'flex',
  p: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const FlexSpaceEvenly = styled(Box)({
  display: 'flex',
  p: 1,
  justifyContent: 'space-evenly',
  alignItems: 'center'
});

export const FlexStart = styled(Box)({
  display: 'flex',
  p: 1,
  justifyContent: 'start',
  alignItems: 'center'
});

export const FlexEnd = styled(Box)({
  display: 'flex',
  p: 1,
  justifyContent: 'flex-end',
  alignItems: 'center'
});

export const FlexSpaceAround = styled(Box)({
  display: 'flex',
  p: 1,
  justifyContent: 'space-around',
  alignItems: 'center'
});