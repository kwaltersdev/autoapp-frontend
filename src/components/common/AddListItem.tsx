// material-ui
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  emphasized: {
    fontStyle: 'italic',
    paddingLeft: theme.spacing(1),
  },
}));

interface AddListItemProps {
  onClick: () => void;
  textVal: string;
};
export default function AddListItem(props: AddListItemProps): React.ReactElement {
  const classes = useStyles();

  const { onClick, textVal } = props;

  return (
    <ListItem button onClick={onClick} className={classes.emphasized}>
      <ListItemText primary={textVal} />
      <AddIcon />
    </ListItem>
  );
}