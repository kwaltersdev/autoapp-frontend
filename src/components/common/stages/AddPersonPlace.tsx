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
import { addPersonPlace } from '../../../services/stages';
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

interface AddPersonPlaceProps {
  personPlaceSelectParent: {
    mounted: MutableRefObject<boolean>;
    stageId: string;
    setPersonPlace: Set<IdName>;
  };
  personPlaceSelect: {
    mounted: MutableRefObject<boolean>;
    addPersonPlace: boolean;
    setAddPersonPlace: Set<boolean>;
    setAllPeoplePlaces: Set<IdName[]>;
    setPeoplePlaces: Set<IdName[]>;
    open: boolean;
    setOpen: Set<boolean>;
  };
};
export default function AddPersonPlace(props: AddPersonPlaceProps): React.ReactElement {
  const classes = useStyles();
  const { delay } = useDemoContext();
  const { personPlaceSelectParent: p, personPlaceSelect: pps } = props;

  const mounted = useCheckMounted();
  const [addPersonPlaceStatus, setAddPersonPlaceStatus] = useState<PostRequestStatus | ''>('');
  const [addPersonPlaceInput, setAddPersonPlaceInput] = useState<string>('');

  const handleChangeAddPersonPlaceInput = (e: React.ChangeEvent<{ value: string; }>): void => {
    setAddPersonPlaceInput(e.target.value);
  };

  // we need to create an updated openRef because the ss.open value will get stale within a function
  const openRef = useRef(pps.open);
  useEffect(() => {
    openRef.current = pps.open;
  }, [pps.open]);

  const handleAddPersonPlace = async () => {
    setAddPersonPlaceStatus('loading');
    await delay();
    addPersonPlace(p.stageId, addPersonPlaceInput)
      .then(result => {
        mounted.current && setAddPersonPlaceStatus(result.status as PostRequestStatus);
        switch (result.status) {
          case 'success':
            if (p.mounted.current && openRef.current) {
              result.doc && p.setPersonPlace(result.doc);
            }
            if (pps.mounted.current) {
              pps.setAddPersonPlace(false);
              result.data && pps.setAllPeoplePlaces(result.data.allPeoplePlaces);
              pps.setOpen(false);
            }
            break;
          default:
            mounted.current && setAddPersonPlaceInput('');
            break;
        }
      }, e => {
        setAddPersonPlaceStatus('failed');
        console.error(e);
      });
  };

  return (
    <Collapse in={pps.addPersonPlace} timeout='auto' unmountOnExit>
      <List>
        {addPersonPlaceStatus === 'loading'
          ? <FlexCenter><CircularProgress /></FlexCenter>
          : <>
            {addPersonPlaceStatus === 'exists'
              &&
              <Typography color='secondary'>
                Already exists
              </Typography>}
            {addPersonPlaceStatus === 'failed'
              &&
              <Typography color='secondary'>
                Failed to add person/place
              </Typography>}
            <ListItem>
              <TextField
                autoFocus
                fullWidth
                id='add-person-place-input'
                label='Add Person/Place*'
                value={addPersonPlaceInput}
                onChange={handleChangeAddPersonPlaceInput}
                autoComplete='off'
              />
            </ListItem>
            <div className={classes.addButtons}>
              <Button onClick={() => pps.setAddPersonPlace(false)}>Cancel</Button>
              <Button
                onClick={addPersonPlaceInput ? handleAddPersonPlace : () => { }}
                disabled={addPersonPlaceInput ? false : true}
                color='primary'>
                Add
              </Button>
            </div>
          </>}
      </List>
    </Collapse>
  );
}