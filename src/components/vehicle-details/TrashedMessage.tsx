// react-router-dom
import { Link } from 'react-router-dom';
// material-ui
import { Typography, Button } from '@mui/material';
// THIS PROJECT
import { FlexCenter } from '../common/flex';

export default function TrashedMessage(): React.ReactElement {
  return (
    <FlexCenter style={{ marginTop: 10 }}>
      <Typography>This vehicle has been moved to the </Typography>
      <Button><Link to='/all-vehicles/trash/asc/10/first/0'>Trash List</Link></Button>
    </FlexCenter>
  );
}