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
// coponents
import { FlexCenter } from '../flex';
// hooks
import { useCheckMounted } from '../../../hooks';
// services
import { addStage } from '../../../services/stages';
// contexts
import { useDemoContext } from '../../../contexts/DemoContext';
// types
import { IdName, Set } from '../../../types/misc';
import { PostRequestStatus } from '../../../types/ServiceRequests';
import { StageSummary } from '../../../types/Stage';

const useStyles = makeStyles((theme) => ({
  addButtons: {
    marginLeft: 'auto',
  },
}));

interface AddStageProps {
  stageSelectParent: {
    mounted: MutableRefObject<boolean>;
    setStage: Set<IdName>;
  };
  stageSelect: {
    mounted: MutableRefObject<boolean>;
    addStage: boolean;
    setAddStage: Set<boolean>;
    setStages: Set<StageSummary[]>;
    open: boolean;
    setOpen: Set<boolean>;
  };
};
export default function AddStage(props: AddStageProps): React.ReactElement {
  const classes = useStyles();
  const { delay } = useDemoContext();
  const { stageSelectParent: p, stageSelect: ss } = props;

  const mounted = useCheckMounted();
  const [addStageStatus, setAddStageStatus] = useState<PostRequestStatus | ''>('');
  const [addStageInput, setAddStageInput] = useState<string>('');

  const handleChangeAddStageInput = (e: React.ChangeEvent<{ value: string; }>): void => {
    setAddStageInput(e.target.value);
  };

  // we need to create an updated openRef because the ms.open value will get stale within a function
  const openRef = useRef(ss.open);
  useEffect(() => {
    openRef.current = ss.open;
  }, [ss.open]);

  const handleAddStage = async () => {
    setAddStageStatus('loading');
    await delay();
    addStage(addStageInput)
      .then(result => {
        mounted.current && setAddStageStatus(result.status as PostRequestStatus);
        switch (result.status) {
          case 'success':
            if (p.mounted.current && openRef.current) {
              result.doc && p.setStage({ id: result.doc.id, name: result.doc.name });
            }
            if (ss.mounted.current) {
              ss.setAddStage(false);
              result.data && ss.setStages(result.data);
              ss.setOpen(false);
            }
            break;
          default:
            mounted.current && setAddStageInput('');
            break;
        }
      }, e => {
        setAddStageStatus('failed');
        console.error(e);
      });
  };

  return (
    <Collapse in={ss.addStage} timeout='auto' unmountOnExit>
      <List>
        {addStageStatus === 'loading'
          ? <FlexCenter><CircularProgress /></FlexCenter>
          : <>
            {addStageStatus === 'exists'
              &&
              <Typography color='secondary'>
                Already exists
              </Typography>}
            {addStageStatus === 'failed'
              &&
              <Typography color='secondary'>
                Failed to add stage
              </Typography>}
            <ListItem>
              <TextField
                autoFocus
                fullWidth
                id='add-stage-input'
                label='Add Stage*'
                value={addStageInput}
                onChange={handleChangeAddStageInput}
                autoComplete='off'
              />
            </ListItem>
            <div className={classes.addButtons}>
              <Button onClick={() => ss.setAddStage(false)}>Cancel</Button>
              <Button
                onClick={addStageInput ? handleAddStage : () => { }}
                disabled={addStageInput ? false : true}
                color='primary'>
                Add
              </Button>
            </div>
          </>}
      </List>
    </Collapse>
  );
}