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
import AddModel from './AddModel';
// hooks
import { useCheckMounted } from '../../../hooks';
// services
import { getModels as getModelsService } from '../../../services/vehicles';
// contexts
import { useDemoContext } from '../../../contexts/DemoContext';
// types
import { IdName, Set } from '../../../types/misc';
import { GetRequestStatus } from '../../../types/ServiceRequests';

interface MakeSelectProps {
  parent: {
    mounted: MutableRefObject<boolean>;
    make: IdName;
    model: IdName;
    setModel: Set<IdName>;
  };
  allowAddModel?: boolean,
  className?: string,
  button?: boolean,
  TextFieldProps?: any,
  ButtonProps?: any;
};
export default function MakeSelect(props: MakeSelectProps): React.ReactElement {
  const { delay } = useDemoContext();
  const {
    parent,
    allowAddModel,
    className,
    button,
    TextFieldProps,
    ButtonProps
  } = props;

  const {
    mounted: pMounted,
    make,
    model,
    setModel
  } = parent;

  const mounted = useCheckMounted();

  const [open, setOpen] = useState<boolean>(false);

  const handleModelSelect = (modeltmp = model) => {
    setModel(modeltmp);
    setOpen(false);
  };

  const [models, setModels] = useState<IdName[]>([]);
  const [getModelsStatus, setGetModelsStatus] = useState<GetRequestStatus>('loading');

  const getModels = useCallback(async () => {
    setGetModelsStatus('loading');
    await delay();
    getModelsService(make.id)
      .then(result => {
        mounted.current && result.data && setModels(result.data);
        mounted.current && setGetModelsStatus(result.status as GetRequestStatus);
      }, e => {
        mounted.current && setGetModelsStatus('failed');
        console.error(e);
      });
  },
    [delay, mounted, make]
  );

  useEffect(() => {
    setModel({ id: '', name: '' });
    if (make.id) {
      getModels();
    };
  }, [getModels, make.id, setModel]);

  const [addModel, setAddModel] = useState<boolean>(false);

  useEffect(() => {
    !open && setAddModel(false);
  }, [open]);

  let dialogContent: JSX.Element;

  switch (getModelsStatus) {
    case 'loading':
      dialogContent = <CircularProgress />;
      break;
    case 'failed':
      dialogContent = <Typography>error loading models</Typography>;
      break;
    default:
      dialogContent = (
        <>
          <Collapse in={!addModel} timeout='auto' unmountOnExit>
            <List>
              <SelectListItem
                onClick={() => handleModelSelect({ id: '', name: '', })}
                textVal=''
                selectCondition={!model.name}
              />
              <Divider />
              {models?.map(modeltmp =>
                <div key={modeltmp.id}>
                  <SelectListItem
                    onClick={() => handleModelSelect(modeltmp)}
                    textVal={modeltmp.name}
                    selectCondition={modeltmp.name === model.name}
                  />
                  <Divider />
                </div>)}
              {allowAddModel &&
                <AddListItem
                  onClick={() => setAddModel(true)}
                  textVal='Add Model'
                />}
            </List >
          </Collapse>
          {allowAddModel && <AddModel
            modelSelectParent={{
              mounted: pMounted,
              makeId: make.id,
              setModel: setModel
            }}
            modelSelect={{
              mounted,
              addModel,
              setAddModel,
              setModels,
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
        label={button ? 'model' : 'Model*'}
        id='model-select'
        value={model.name}
        setOpen={setOpen}
        className={className}
        button={button ? true : false}
        TextFieldProps={TextFieldProps}
        ButtonProps={ButtonProps}
        disabled={make.name ? false : true}
      />
      <SelectDialog open={open} setOpen={setOpen}
        flex={getModelsStatus === 'success' ? false : true}>
        {dialogContent}
      </SelectDialog>
    </>
  );
};
