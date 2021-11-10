// react
import { useState } from 'react';
// mui
import makeStyles from '@mui/styles/makeStyles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import InputAdornment from '@mui/material/InputAdornment';

const useStyles = makeStyles((theme) => ({
  taskList: {
    outline: '1px solid #D3D3D3',
    margin: 'auto',
    marginTop: theme.spacing(0),
    backgroundColor: '#F8F8F8',
  },
  listItem: {
    wordWrap: 'break-word',
  },
}));

interface TaskListInputProps {
  taskList: string[];
  setTaskList: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
};
export default function TaskListInput(props: TaskListInputProps): React.ReactElement {
  const classes = useStyles();
  const { taskList, setTaskList, className } = props;
  const [task, setTask] = useState<string>('');

  const handleTaskInputChange = (e: React.ChangeEvent<{ value: string; }>): void => {
    setTask(e.target.value);
  };

  const addTask = () => {
    setTaskList([...taskList, task]);
    setTask('');
  };

  const removeTask = (index: number) => {
    let taskListTmp = [...taskList];
    taskListTmp.splice(index, 1);
    setTaskList(taskListTmp);
  };

  let taskListComponent: JSX.Element;

  if (taskList.length > 0) {
    taskListComponent = (
      <div className={className}>
        <List className={classes.taskList}>
          {taskList.map((task, index) => <ListItem key={task + Math.random()} alignItems='flex-start'>
            <ListItemText className={classes.listItem}>
              <div className={classes.listItem}>
                {task}
              </div>
            </ListItemText>
            <IconButton onClick={() => removeTask(index)} size='small'>
              <ClearIcon />
            </IconButton>
          </ListItem>)}
        </List>
      </div>
    );
  } else {
    taskListComponent = (<></>);
  };

  let taskAddButton: JSX.Element;

  if (task) {
    taskAddButton = (
      <IconButton onClick={addTask} size="large">
        <AddIcon />
      </IconButton>
    );
  } else {
    taskAddButton = (
      <IconButton disabled size="large">
        <AddIcon />
      </IconButton>
    );
  };

  return (
    <>
      <TextField
        className={className && className}
        label='Add Task'
        variant='outlined'
        value={task}
        onChange={handleTaskInputChange}
        InputProps={{
          endAdornment:
            <InputAdornment position='end'>
              {taskAddButton}
            </InputAdornment>
        }}
      />
      {taskListComponent}
    </>
  );
}