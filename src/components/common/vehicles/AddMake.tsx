// react
import { useState, useEffect, MutableRefObject, useRef } from 'react';
// material-ui
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import makeStyles from '@mui/styles/makeStyles';
// THIS PROJECT
// components
import { FlexCenter } from '../flex';
// hooks
import { useCheckMounted } from '../../../hooks';
// services
import { addMake } from '../../../services/vehicles';
// contexts
import { useDemoContext } from '../../../contexts/DemoContext';
// types
import { IdName, Set } from '../../../types/misc';
import { PostRequestStatus } from '../../../types/ServiceRequests';


const useStyles = makeStyles((theme) => ({
  addButtons: {
    marginLeft: 'auto',
  },
}));

interface AddMakeProps {
  makeSelectParent: {
    mounted: MutableRefObject<boolean>;
    setMake: Set<IdName>;
  };
  makeSelect: {
    mounted: MutableRefObject<boolean>;
    addMake: boolean;
    setAddMake: Set<boolean>;
    setMakes: Set<IdName[]>;
    open: boolean;
    setOpen: Set<boolean>;
  };
};
export default function AddMake(props: AddMakeProps): React.ReactElement {
  const classes = useStyles();
  const { delay } = useDemoContext();

  const { makeSelectParent: p, makeSelect: ms } = props;

  const mounted = useCheckMounted();
  const [addMakeStatus, setAddMakeStatus] = useState<PostRequestStatus | ''>('');
  const [addMakeInput, setAddMakeInput] = useState<string>('');

  const handleChangeAddMakeInput = (e: React.ChangeEvent<{ value: string; }>): void => {
    setAddMakeInput(e.target.value.toUpperCase());
  };

  // we need to create an updated openRef because the ms.open value will get stale within a function
  const openRef = useRef(ms.open);
  useEffect(() => {
    openRef.current = ms.open;
  }, [ms.open]);

  const handleAddMake = async () => {
    setAddMakeStatus('loading');
    await delay();
    addMake(addMakeInput)
      .then(result => {
        mounted.current && setAddMakeStatus(result.status as PostRequestStatus);
        switch (result.status) {
          case 'success':
            if (p.mounted.current && openRef.current) {
              result.doc && p.setMake(result.doc);
            }
            if (ms.mounted.current) {
              ms.setAddMake(false);
              result.data && ms.setMakes(result.data);
              ms.setOpen(false);
            }
            break;
          default:
            mounted.current && setAddMakeInput('');
            break;
        };
      }, e => {
        setAddMakeStatus('failed');
        console.error(e);
      });
  };

  return (
    <Collapse in={ms.addMake} timeout='auto' unmountOnExit>
      <List>
        {addMakeStatus === 'loading'
          ? <FlexCenter><CircularProgress /></FlexCenter>
          : <>
            {addMakeStatus === 'exists'
              &&
              <Typography color='secondary'>
                Already exists
              </Typography>}
            {addMakeStatus === 'failed'
              &&
              <Typography color='secondary'>
                Failed to add make
              </Typography>}
            <ListItem>
              <TextField
                autoFocus
                fullWidth
                id='add-make-input'
                label='Add Make*'
                value={addMakeInput}
                onChange={handleChangeAddMakeInput}
                autoComplete='off'
              />
            </ListItem>
            <div className={classes.addButtons}>
              <Button onClick={() => ms.setAddMake(false)}>Cancel</Button>
              <Button
                onClick={addMakeInput ? handleAddMake : () => { }}
                disabled={addMakeInput ? false : true}
                color='primary'>
                Add
              </Button>
            </div>
          </>}
      </List>
    </Collapse>
  );
}