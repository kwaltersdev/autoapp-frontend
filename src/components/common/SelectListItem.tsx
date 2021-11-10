// material-ui
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingLeft: theme.spacing(2),
  },
  emphasized: {
    fontStyle: 'italic',
    paddingLeft: theme.spacing(1),
  },
}));

interface SelectListItemProps {
  onClick: (selection: unknown) => void;
  textVal: string;
  selectCondition: boolean;
  emphasize?: boolean;
};
export default function SelectListItem(props: SelectListItemProps): React.ReactElement {
  const classes = useStyles();

  const { onClick, textVal, selectCondition, emphasize } = props;

  return (
    <ListItem button onClick={onClick} className={emphasize ? classes.emphasized : classes.listItem}>
      <ListItemText primary={textVal} />
      {selectCondition
        ? <RadioButtonCheckedIcon color='primary' />
        : <RadioButtonUncheckedIcon />}
    </ListItem>
  );
}