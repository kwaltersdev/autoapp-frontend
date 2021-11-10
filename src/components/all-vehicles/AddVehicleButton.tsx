// react-router-dom
import { Link } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles({
  addButton: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
});

export default function AddVehicleButton(): React.ReactElement {
  const classes = useStyles();

  return (
    <Box className={classes.addButton}>
      <Link to='/add-vehicle'>
        <Fab size='small' color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>
    </Box>
  );
}