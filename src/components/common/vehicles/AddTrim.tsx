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
import { addTrim } from '../../../services/vehicles';
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

interface AddTrimProps {
  trimSelectParent: {
    mounted: MutableRefObject<boolean>;
    modelId: string;
    setTrim: Set<IdName>;
  };
  trimSelect: {
    mounted: MutableRefObject<boolean>;
    addTrim: boolean;
    setAddTrim: Set<boolean>;
    setTrims: Set<IdName[]>;
    open: boolean;
    setOpen: Set<boolean>;
  };
};
export default function AddTrim(props: AddTrimProps): React.ReactElement {
  const classes = useStyles();
  const { delay } = useDemoContext();

  const { trimSelectParent: p, trimSelect: ts } = props;

  const mounted = useCheckMounted();
  const [addTrimStatus, setAddTrimStatus] = useState<PostRequestStatus | ''>('');
  const [addTrimInput, setAddTrimInput] = useState<string>('');

  const handleChangeAddTrimInput = (e: React.ChangeEvent<{ value: string; }>): void => {
    setAddTrimInput(e.target.value.toUpperCase());
  };

  // we need to create an updated openRef because the ms.open value will get stale within a function
  const openRef = useRef(ts.open);
  useEffect(() => {
    openRef.current = ts.open;
  }, [ts.open]);

  const handleAddTrim = async () => {
    setAddTrimStatus('loading');
    await delay();
    addTrim(p.modelId, addTrimInput)
      .then(result => {
        mounted.current && setAddTrimStatus(result.status as PostRequestStatus);
        switch (result.status) {
          case 'success':
            if (p.mounted.current && openRef.current) {
              result.patch && p.setTrim(result.patch);
            }
            if (ts.mounted.current) {
              ts.setAddTrim(false);
              result.data && ts.setTrims(result.data);
              ts.setOpen(false);
            }
            break;
          default:
            mounted.current && setAddTrimInput('');
            break;
        };
      }, e => {
        setAddTrimStatus('failed');
        console.error(e);
      });
  };

  return (
    <Collapse in={ts.addTrim} timeout='auto' unmountOnExit>
      <List>
        {addTrimStatus === 'loading'
          ? <FlexCenter><CircularProgress /></FlexCenter>
          : <>
            {addTrimStatus === 'exists'
              &&
              <Typography color='secondary'>
                Already exists
              </Typography>}
            {addTrimStatus === 'failed'
              &&
              <Typography color='secondary'>
                Failed to add trim
              </Typography>}
            <ListItem>
              <TextField
                autoFocus
                fullWidth
                id='add-trim-input'
                label='Add Trim*'
                value={addTrimInput}
                onChange={handleChangeAddTrimInput}
                autoComplete='off'
              />
            </ListItem>
            <div className={classes.addButtons}>
              <Button onClick={() => ts.setAddTrim(false)}>Cancel</Button>
              <Button
                onClick={addTrimInput ? handleAddTrim : () => { }}
                disabled={addTrimInput ? false : true}
                color='primary'>
                Add
              </Button>
            </div>
          </>}
      </List>
    </Collapse>
  );
}