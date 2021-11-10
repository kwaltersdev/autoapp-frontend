// react
import { useEffect, useState, MutableRefObject, useCallback } from 'react';
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
import AddTrim from './AddTrim';
// hooks
import { useCheckMounted } from '../../../hooks';
// sevices
import { getTrims as getTrimsService } from '../../../services/vehicles';
// contexts
import { useDemoContext } from '../../../contexts/DemoContext';
// types
import { IdName, Set } from '../../../types/misc';
import { GetRequestStatus } from '../../../types/ServiceRequests';

interface TrimSelectProps {
  parent: {
    mounted: MutableRefObject<boolean>;
    make: IdName;
    model: IdName;
    trim: IdName;
    setTrim: Set<IdName>;
  };
  allowAddTrim?: boolean;
  className?: string;
  button?: boolean;
  TextFieldProps?: any;
  ButtonProps?: any;
};
export default function TrimSelect(props: TrimSelectProps): React.ReactElement {
  const { delay } = useDemoContext();
  const {
    parent,
    allowAddTrim,
    className,
    button,
    TextFieldProps,
    ButtonProps
  } = props;

  const {
    mounted: pMounted,
    make,
    model,
    trim,
    setTrim
  } = parent;

  const mounted = useCheckMounted();

  const [open, setOpen] = useState<boolean>(false);

  const handleTrimSelect = (trimtmp = trim) => {
    setTrim(trimtmp);
    setOpen(false);
  };

  const [trims, setTrims] = useState<IdName[]>([]);
  const [getTrimsStatus, setGetTrimsStatus] = useState<GetRequestStatus>('loading');

  const getTrims = useCallback(async () => {
    setGetTrimsStatus('loading');
    await delay();
    getTrimsService(model.id)
      .then(result => {
        mounted.current && result.data && setTrims(result.data);
        mounted.current && setGetTrimsStatus(result.status as GetRequestStatus);
      }, e => {
        mounted.current && setGetTrimsStatus('failed');
        console.error(e);
      });
  },
    [delay, mounted, model.id]
  );

  useEffect(() => {
    setTrim({ id: '', name: '' });
    if (model.id) {
      getTrims();
    };
  }, [getTrims, setTrim, model.id]);

  const [addTrim, setAddTrim] = useState<boolean>(false);

  useEffect(() => {
    !open && setAddTrim(false);
  }, [open]);

  let dialogContent: JSX.Element;

  switch (getTrimsStatus) {
    case 'loading':
      dialogContent = <CircularProgress />;
      break;
    case 'failed':
      dialogContent = <Typography>error loading makes</Typography>;
      break;
    default:
      dialogContent = (
        <>
          <Collapse in={!addTrim} timeout='auto' unmountOnExit>
            <List>
              <SelectListItem
                onClick={() => handleTrimSelect({ id: '', name: '' })}
                textVal=''
                selectCondition={!make.name}
              />
              <Divider />
              {trims.map(trimtmp =>
                <div key={trimtmp.id}>
                  <SelectListItem
                    onClick={() => handleTrimSelect(trimtmp)}
                    textVal={trimtmp.name}
                    selectCondition={trimtmp === trim}
                  />
                  <Divider />
                </div>)}
              {allowAddTrim &&
                <AddListItem
                  onClick={() => setAddTrim(true)}
                  textVal='Add Trim'
                />}
            </List >
          </Collapse>
          {allowAddTrim && <AddTrim
            trimSelectParent={{
              mounted: pMounted,
              modelId: model.id,
              setTrim: setTrim,
            }}
            trimSelect={{
              mounted,
              addTrim,
              setAddTrim,
              setTrims,
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
        label={button ? 'trim' : 'Trim'}
        id='trim-select'
        value={trim.name}
        setOpen={setOpen}
        className={className}
        button={button ? true : false}
        TextFieldProps={TextFieldProps}
        ButtonProps={ButtonProps}
        disabled={model.name ? false : true}
      />
      <SelectDialog open={open} setOpen={setOpen}
        flex={getTrimsStatus === 'success' ? false : true}>
        {dialogContent}
      </SelectDialog>
    </>
  );
}