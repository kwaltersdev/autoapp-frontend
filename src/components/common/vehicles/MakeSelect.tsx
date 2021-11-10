// react
import { useEffect, useState, useCallback } from 'react';
// material-ui
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
// THIS PROJECT
// components
import SelectDialog from '../SelectDialog';
import CustomSelect from '../CustomSelect';
import SelectListItem from '../SelectListItem';
import AddListItem from '../AddListItem';
import AddMake from './AddMake';
// hooks
import { useCheckMounted } from '../../../hooks';
// services
import { getMakes as getMakesService } from '../../../services/vehicles';
// contexts
import { useDemoContext } from '../../../contexts/DemoContext';
// types
import { IdName, Set } from '../../../types/misc';
import { GetRequestStatus } from '../../../types/ServiceRequests';

interface MakeSelectProps {
  parent: {
    mounted: React.MutableRefObject<boolean>;
    make: IdName;
    setMake: Set<IdName>;
  };
  allowAddMake?: boolean;
  className?: string;
  button?: boolean;
  TextFieldProps?: any;
  ButtonProps?: any;
};
export default function MakeSelect(props: MakeSelectProps): React.ReactElement {
  const { delay } = useDemoContext();
  const {
    parent,
    allowAddMake,
    className,
    button,
    TextFieldProps,
    ButtonProps
  } = props;

  const {
    mounted: pMounted,
    make,
    setMake
  } = parent;

  const mounted = useCheckMounted();

  const [open, setOpen] = useState<boolean>(false);

  const handleMakeSelect = (maketmp = make) => {
    setMake(maketmp);
    setOpen(false);
  };

  const [makes, setMakes] = useState<IdName[]>([]);
  const [getMakesStatus, setGetMakesStatus] = useState<GetRequestStatus>('loading');

  const getMakes = useCallback(async () => {
    setGetMakesStatus('loading');
    await delay();
    getMakesService()
      .then(result => {
        mounted.current && result.data && setMakes(result.data);
        mounted.current && setGetMakesStatus(result.status as GetRequestStatus);
      }, e => {
        mounted.current && setGetMakesStatus('failed');
        console.error(e);
      });

  },
    [delay, mounted]
  );

  useEffect(() => {
    getMakes();
  }, [getMakes]);

  const [addMake, setAddMake] = useState<boolean>(false);

  useEffect(() => {
    !open && setAddMake(false);
  }, [open]);

  let dialogContent: JSX.Element;

  switch (getMakesStatus) {
    case 'loading':
      dialogContent = <CircularProgress />;
      break;
    case 'failed':
      dialogContent = <Typography>error loading makes</Typography>;
      break;
    default:
      dialogContent = (
        <>
          <Collapse in={!addMake} timeout='auto' unmountOnExit>
            <List>
              <SelectListItem
                onClick={() => handleMakeSelect({ id: '', name: '' })}
                textVal=''
                selectCondition={!make.name}
              />
              <Divider />
              {makes.map(maketmp =>
                <div key={maketmp.id}>
                  <SelectListItem
                    onClick={() => handleMakeSelect(maketmp)}
                    textVal={maketmp.name}
                    selectCondition={maketmp === make}
                  />
                  <Divider />
                </div>)}
              {allowAddMake &&
                <AddListItem
                  onClick={() => setAddMake(true)}
                  textVal='Add Make'
                />}
            </List >
          </Collapse>
          {allowAddMake && <AddMake
            makeSelectParent={{
              mounted: pMounted,
              setMake: setMake,
            }}
            makeSelect={{
              mounted,
              setMakes,
              addMake,
              setAddMake,
              open,
              setOpen
            }}
          />}
        </>
      );
  };

  return (
    <>
      <CustomSelect
        label={button ? 'make' : 'Make*'}
        id='make-select'
        value={make.name}
        setOpen={setOpen}
        className={className}
        button={button ? true : false}
        TextFieldProps={TextFieldProps}
        ButtonProps={ButtonProps}
      />
      <SelectDialog open={open} setOpen={setOpen}
        flex={getMakesStatus === 'success' ? false : true}>
        {dialogContent}
      </SelectDialog>
    </>
  );
};
