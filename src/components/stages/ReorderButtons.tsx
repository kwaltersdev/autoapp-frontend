// material-ui
import makeStyles from '@mui/styles/makeStyles';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
// THIS PROJECT
// services
import { updateStageOrder } from '../../services/stages';
// contexts
import { useDemoContext } from '../../contexts/DemoContext';
// types
import { StageSummary, UpdatedStageOrder } from "../../types/Stage";
import { PostRequestStatus } from '../../types/ServiceRequests';
import { Set } from '../../types/misc';

const useStyles = makeStyles(theme => ({
  updateButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  updateButton: {
    width: 100,
  },
}));

interface ReorderButtonsProps {
  mounted: React.MutableRefObject<boolean>;
  setReorderStages: Set<boolean>;
  originalStageOrder: StageSummary[];
  editStageOrder: StageSummary[];
  setEditStageOrder: Set<StageSummary[]>;
  setOrderStagesStatus: Set<PostRequestStatus>;
  getStageVehicleCounts: () => void;
};
export default function ReorderButtons(props: ReorderButtonsProps): React.ReactElement {
  const classes = useStyles();
  const { delay } = useDemoContext();
  const {
    mounted,
    setReorderStages,
    originalStageOrder,
    editStageOrder, setEditStageOrder,
    setOrderStagesStatus,
    getStageVehicleCounts,
  } = props;

  const compareOrders = (original: StageSummary[], edit: StageSummary[]) => {
    for (let i = 0; i < original.length; ++i) {
      if (original[i] !== edit[i]) return false;
    };
    return true;
  };

  const updateStageOrderClick = async () => {
    let newStageOrder: UpdatedStageOrder[] = [];

    editStageOrder.forEach((stage, index) => {
      if (stage !== originalStageOrder[index]) {
        newStageOrder.push({
          id: stage.id,
          order: index
        });
      };
    });
    setOrderStagesStatus('loading');
    await delay();
    updateStageOrder(newStageOrder)
      .then(result => {
        mounted && setOrderStagesStatus(result.status);
        mounted && result.status === 'failed' && console.error(result);
        result.status === 'success' && getStageVehicleCounts();
        mounted && setReorderStages(false);
      }, e => {
        mounted && setOrderStagesStatus('failed');
        console.error(e);
      });
  };

  const cancelClick = () => {
    setReorderStages(false);
    setEditStageOrder(originalStageOrder);
  };

  return (
    <FormControl className={classes.updateButtons}>
      <Button className={classes.updateButton} onClick={cancelClick}>cancel</Button>
      {compareOrders(originalStageOrder, editStageOrder)
        ? <Button disabled className={classes.updateButton}>update</Button>
        : <Button className={classes.updateButton} onClick={updateStageOrderClick} color='primary'>update</Button>}
    </FormControl>
  );
}