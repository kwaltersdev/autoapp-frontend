// material-ui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Skeleton from '@mui/material/Skeleton';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  skeleton: {
    width: '100%',
  },
});

interface LoadingListProps {
  skeletonCount: number;
};
export default function LoadingList(props: LoadingListProps): React.ReactElement {
  const classes = useStyles();

  const list: JSX.Element[] = [];

  for (let i = 0; i < props.skeletonCount; i++) {
    list.push(
      <ListItem key={i}>
        <Skeleton className={classes.skeleton} variant='text' />
      </ListItem>
    );
  };
  return (
    <List>
      {list.map(skeleton => skeleton)}
    </List>
  );
};
