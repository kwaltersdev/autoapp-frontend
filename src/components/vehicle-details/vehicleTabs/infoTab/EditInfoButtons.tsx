// material-ui
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
// THIS PROJECT
// components
import { FlexSpaceBtwn } from '../../../common/flex';
// services
import { checkStock, updateVehicle as updateVehicleService } from '../../../../services/vehicles';
// contexts
import { useDemoContext } from '../../../../contexts/DemoContext';
// types
import { EditVehicleState } from '../../../../types/Vehicle';
import { Set } from '../../../../types/misc';

interface EditInfoButtonsProps {
  editVehicleState: EditVehicleState;
  setEdit: Set<boolean>;
  className?: string;
};
export default function EditInfoButtons(props: EditInfoButtonsProps): React.ReactElement {
  const { editVehicleState, setEdit, className } = props;
  const { delay } = useDemoContext();
  const {
    vehicleDetailsMounted,
    mounted,
    vehicleId,
    stock,
    stockOkay,
    setStockError,
    editStock,
    year, editYear,
    make, editMake,
    model, editModel,
    trim, editTrim,
    dateAdded, editDateAdded,
    dateSold, editDateSold,
    editVehicleStatus, setEditVehicleStatus,
    setVehicle
  } = editVehicleState;

  const updateVehicle = () => {
    const updateVehicleDoc = {
      stock: parseInt(editStock),
      year: parseInt(editYear),
      make: editMake,
      model: editModel,
      trim: editTrim,
      dateAdded: editDateAdded,
      dateSold: dateSold && editDateSold,
    };
    updateVehicleService(vehicleId, updateVehicleDoc)
      .then(result => {
        mounted.current && setEditVehicleStatus(result.status);
        if (result.status === 'success') {
          vehicleDetailsMounted.current && setVehicle(result.doc);
          mounted && setEdit(false);
        };
        result.status === 'failed' && console.error(result);
      }, e => {
        mounted.current && setEditVehicleStatus('failed');
        console.error(e);
      });
  };

  const updateVehicleClick = async () => {
    setEditVehicleStatus('loading');
    await delay();
    if (stock === editStock) {
      updateVehicle();
    } else {
      checkStock(editStock)
        .then(result => {
          if (mounted.current && result.data && result.data.exists) {
            setEditVehicleStatus('');
            setStockError('stk# already exists');
          } else {
            updateVehicle();
          };
        }, e => {
          mounted.current && setEditVehicleStatus('failed');
          console.error(e);
        });
    };
  };

  const cancelClick = () => setEdit(false);

  let updateButton: JSX.Element;

  const enabledUpdateButton = (
    <Button variant='contained' color='primary' onClick={updateVehicleClick}>
      Update
    </Button>
  );

  const disabledUpdateButton = (
    <Button variant='contained' color='primary' disabled>
      Update
    </Button>
  );

  if (editVehicleStatus === 'loading') {
    updateButton = <CircularProgress size={25} />;
  } else if (dateSold) {
    if (
      stock !== editStock
      || year !== editYear
      || make !== editMake
      || model !== editModel
      || trim !== editTrim
      || dateAdded !== editDateAdded
      || dateSold !== editDateSold
    ) {
      if (stockOkay && editYear && editMake.id && editModel.id && editDateAdded) {
        updateButton = enabledUpdateButton;
      } else {
        updateButton = disabledUpdateButton;
      };
    } else {
      updateButton = disabledUpdateButton;
    };
  } else if (
    stock !== editStock
    || year !== editYear
    || make !== editMake
    || model !== editModel
    || trim !== editTrim
    || dateAdded !== editDateAdded
  ) {
    if (stockOkay && editYear && editMake.id && editModel.id && editDateAdded) {
      updateButton = enabledUpdateButton;
    } else {
      updateButton = disabledUpdateButton;
    };
  } else {
    updateButton = disabledUpdateButton;
  };

  return (
    <FlexSpaceBtwn className={className ? className : ''}>
      <Button variant='contained' onClick={cancelClick}>Cancel</Button>
      {updateButton}
    </FlexSpaceBtwn>
  );
}