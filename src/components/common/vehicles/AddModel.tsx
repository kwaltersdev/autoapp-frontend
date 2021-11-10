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
import { addModel } from '../../../services/vehicles';
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

interface AddModelProps {
  modelSelectParent: {
    mounted: MutableRefObject<boolean>;
    makeId: string;
    setModel: Set<IdName>;
  };
  modelSelect: {
    mounted: MutableRefObject<boolean>;
    addModel: boolean;
    setAddModel: Set<boolean>;
    setModels: Set<IdName[]>;
    open: boolean;
    setOpen: Set<boolean>;
  };
};
export default function AddModel(props: AddModelProps): React.ReactElement {
  const classes = useStyles();
  const { delay } = useDemoContext();

  const { modelSelectParent: p, modelSelect: ms } = props;

  const mounted = useCheckMounted();
  const [addModelStatus, setAddModelStatus] = useState<PostRequestStatus | ''>('');
  const [addModelInput, setAddModelInput] = useState<string>('');

  const handleChangeAddModelInput = (e: React.ChangeEvent<{ value: string; }>): void => {
    setAddModelInput(e.target.value.toUpperCase());
  };

  // we need to create an updated openRef because the ms.open value will get stale within a function
  const openRef = useRef(ms.open);
  useEffect(() => {
    openRef.current = ms.open;
  }, [ms.open]);

  const handleAddModel = async () => {
    setAddModelStatus('loading');
    await delay();
    addModel(p.makeId, addModelInput)
      .then(result => {
        mounted.current && setAddModelStatus(result.status as PostRequestStatus);
        switch (result.status) {
          case 'success':
            if (p.mounted.current && openRef.current) {
              result.doc && p.setModel(result.doc);
            }
            if (ms.mounted.current) {
              ms.setAddModel(false);
              result.data && ms.setModels(result.data);
              ms.setOpen(false);
            }
            break;
          default:
            mounted.current && setAddModelInput('');
            break;
        };
      }, e => {
        setAddModelStatus('failed');
        console.error(e);
      });
  };

  return (
    <Collapse in={ms.addModel} timeout='auto' unmountOnExit>
      <List>
        {addModelStatus === 'loading'
          ? <FlexCenter><CircularProgress /></FlexCenter>
          : <>
            {addModelStatus === 'exists'
              &&
              <Typography color='secondary'>
                Already exists
              </Typography>}
            {addModelStatus === 'failed'
              &&
              <Typography color='secondary'>
                Failed to add model
              </Typography>}
            <ListItem>
              <TextField
                autoFocus
                fullWidth
                id='add-model-input'
                label='Add Model*'
                value={addModelInput}
                onChange={handleChangeAddModelInput}
                autoComplete='off'
              />
            </ListItem>
            <div className={classes.addButtons}>
              <Button onClick={() => ms.setAddModel(false)}>Cancel</Button>
              <Button
                onClick={addModelInput ? handleAddModel : () => { }}
                disabled={addModelInput ? false : true}
                color='primary'>
                Add
              </Button>
            </div>
          </>}
      </List>
    </Collapse>
  );
}