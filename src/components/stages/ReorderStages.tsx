// react
import { useEffect, useState, useCallback } from 'react';
// react-beautiful-dnd
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
// THIS PROJECT
// components
import CenteredError from '../common/CenteredError';
import LoadingList from '../common/LoadingList';
import ReorderButtons from './ReorderButtons';
// hooks
import { useCheckMounted } from '../../hooks';
// services
import { getStages as getStagesService } from '../../services/stages';
// contexts
import { useDemoContext } from '../../contexts/DemoContext';
// types
import { StageSummary } from "../../types/Stage";
import { GetRequestStatus, PostRequestStatus } from '../../types/ServiceRequests';
import { Set } from '../../types/misc';

const useStyles = makeStyles(theme => ({
  stage: {
    marginTop: 5,
    marginBottom: 5,
    border: '1pt solid #999999',
  },
  list: {
    backgroundColor: '#F9F9F9',
    padding: theme.spacing(1),
  },
}));

interface ReorderStagesProps {
  setReorderStages: Set<boolean>;
  getStageVehicleCounts: () => void;
};
export default function ReorderStages(props: ReorderStagesProps): React.ReactElement {
  const mounted = useCheckMounted();
  const classes = useStyles();
  const { delay } = useDemoContext();
  const { setReorderStages, getStageVehicleCounts } = props;

  const [originalStageOrder, setOriginalStageOrder] = useState<StageSummary[]>([]);
  const [editStageOrder, setEditStageOrder] = useState<StageSummary[]>([]);
  const [getStagesStatus, setGetStagesStatus] = useState<GetRequestStatus>('');
  const [orderStagesStatus, setOrderStagesStatus] = useState<PostRequestStatus>('');

  const getStages = useCallback(async () => {
    setGetStagesStatus('loading');
    await delay();
    getStagesService()
      .then(result => {
        mounted.current && setGetStagesStatus(result.status as GetRequestStatus);
        if (result.status === 'success' && mounted.current && result.data) {
          setOriginalStageOrder(result.data);
          setEditStageOrder(result.data);
        }
        result.status === 'failed' && console.error(result);
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

  const handleOnDragEnd = (result: DropResult) => {
    const newStageOrder = [...editStageOrder];
    const [reorderedStage] = newStageOrder.splice(result.source.index, 1);
    if (result.destination) {
      newStageOrder.splice(result.destination.index, 0, reorderedStage);
    };
    setEditStageOrder(newStageOrder);
  };

  const defaultReturn = (
    <>
      <Accordion disabled className={classes.stage}>
        <AccordionSummary>
          <Typography>Assign</Typography>
        </AccordionSummary>
      </Accordion>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='stages'>
          {(provided) => (
            <List className={classes.list} {...provided.droppableProps} ref={provided.innerRef}>
              {editStageOrder.map((stage, index) => {
                if (stage.name !== 'Assign' && stage.name !== 'For Sale') {
                  return (
                    <Draggable key={stage.id} draggableId={stage.id} index={index}>
                      {(provided) => (
                        <Accordion
                          className={classes.stage}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <AccordionSummary
                            expandIcon={<DragIndicatorIcon />}
                          >
                            <Typography>{stage.name}</Typography>
                          </AccordionSummary>
                        </Accordion>
                      )}
                    </Draggable>
                  );
                } else return <span key={stage.id}></span>;
              })}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
      <Accordion disabled className={classes.stage}>
        <AccordionSummary>
          <Typography>For Sale</Typography>
        </AccordionSummary>
      </Accordion>
      <ReorderButtons
        mounted={mounted}
        setReorderStages={setReorderStages}
        originalStageOrder={originalStageOrder}
        editStageOrder={editStageOrder}
        setEditStageOrder={setEditStageOrder}
        setOrderStagesStatus={setOrderStagesStatus}
        getStageVehicleCounts={getStageVehicleCounts}
      />
    </>
  );

  switch (getStagesStatus) {
    case ('failed'):
      return <CenteredError errorMessage='Error loading Edit Stage Order' />;
    case ('loading'):
      return <LoadingList skeletonCount={10} />;
    default:
      switch (orderStagesStatus) {
        case ('failed'):
          return <CenteredError errorMessage='Error saving Edited Stage Order' />;
        case ('loading'):
          return <LoadingList skeletonCount={10} />;
        default:
          return defaultReturn;
      }
  }
}