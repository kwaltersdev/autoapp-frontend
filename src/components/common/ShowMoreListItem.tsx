// material-ui
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  emphasized: {
    fontStyle: 'italic',
    paddingLeft: theme.spacing(1),
  },
}));

interface ShowMoreListItemProps {
  onClick: () => void;
  selectCondition: boolean;
};
export default function ShowMoreListItem(props: ShowMoreListItemProps): React.ReactElement {
  const classes = useStyles();

  const { onClick, selectCondition } = props;

  return (
    <ListItem button onClick={onClick} className={classes.emphasized}>
      <ListItemText primary={selectCondition ? 'Show less...' : 'Show more...'} />
      {selectCondition ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
  );
}