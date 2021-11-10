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
import AddStage from './AddStage';
// hooks
import { useCheckMounted } from '../../../hooks';
// services
import { getStages as getStagesService } from '../../../services/stages';
// contexts
import { useDemoContext } from '../../../contexts/DemoContext';
// types
import { IdName, Set } from '../../../types/misc';
import { StageSummary } from '../../../types/Stage';
import { GetRequestStatus } from '../../../types/ServiceRequests';

interface StageSelectProps {
  parent: {
    mounted: React.MutableRefObject<boolean>;
    stage: IdName;
    setStage: Set<IdName>;
  };
  allowAddStage?: boolean;
  className?: string;
  button?: boolean;
  TextFieldProps?: any;
  ButtonProps?: any;
};
export default function StageSelect(props: StageSelectProps): React.ReactElement {
  const { delay } = useDemoContext();
  const {
    parent,
    allowAddStage,
    className,
    button,
    TextFieldProps,
    ButtonProps
  } = props;

  const {
    mounted: pMounted,
    stage,
    setStage
  } = parent;

  const mounted = useCheckMounted();

  const [open, setOpen] = useState<boolean>(false);

  const handleStageSelect = (stagetmp = stage) => {
    setStage({ id: stagetmp.id, name: stagetmp.name });
    setOpen(false);
  };

  const [stages, setStages] = useState<StageSummary[]>([]);
  const [getStagesStatus, setGetStagesStatus] = useState<GetRequestStatus>('loading');

  const getStages = useCallback(async () => {
    setGetStagesStatus('loading');
    await delay();
    getStagesService()
      .then(result => {
        mounted.current && result.data && setStages(result.data);
        mounted.current && setGetStagesStatus(result.status as GetRequestStatus);
      }, e => {
        mounted.current && setGetStagesStatus('failed');
        console.error(e);
      });

  },
    [delay, mounted]
  );

  useEffect(() => {
    getStages();
  }, [getStages]);

  const [addStage, setAddStage] = useState<boolean>(false);

  useEffect(() => {
    !open && setAddStage(false);
  }, [open]);

  let dialogContent: JSX.Element;

  switch (getStagesStatus) {
    case 'loading':
      dialogContent = <CircularProgress />;
      break;
    case 'failed':
      dialogContent = <Typography>error loading stages</Typography>;
      break;
    default:
      dialogContent = (
        <>
          <Collapse in={!addStage} timeout='auto' unmountOnExit>
            <List>
              <SelectListItem
                onClick={() => handleStageSelect({ id: '', name: '' })}
                textVal=''
                selectCondition={!stage.name}
              />
              <Divider />
              {stages.map(stagetmp =>
                <div key={stagetmp.id}>
                  <SelectListItem
                    onClick={() => handleStageSelect(stagetmp)}
                    textVal={stagetmp.name}
                    selectCondition={stagetmp.name === stage.name}
                  />
                  <Divider />
                </div>)}
              {allowAddStage &&
                <AddListItem
                  onClick={() => setAddStage(true)}
                  textVal='Add Stage'
                />}
            </List >
          </Collapse>
          {allowAddStage && <AddStage
            stageSelectParent={{
              mounted: pMounted,
              setStage: setStage,
            }}
            stageSelect={{
              mounted,
              setStages,
              addStage,
              setAddStage,
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
        label={button ? 'stage' : 'Stage*'}
        id='stage-select'
        value={stage.name}
        setOpen={setOpen}
        className={className}
        button={button ? true : false}
        TextFieldProps={TextFieldProps}
        ButtonProps={ButtonProps}
      />
      <SelectDialog open={open} setOpen={setOpen}
        flex={getStagesStatus === 'success' ? false : true}>
        {dialogContent}
      </SelectDialog>
    </>
  );
}