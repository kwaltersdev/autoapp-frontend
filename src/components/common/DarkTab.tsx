// material-ui
import withStyles from '@mui/styles/withStyles';
import Tab from '@mui/material/Tab';

const DarkTab = withStyles({
  root: {
    '&$selected': {
      backgroundColor: '#F5F5F5',
    }
  },
  selected: {},
})(Tab);

export default DarkTab;