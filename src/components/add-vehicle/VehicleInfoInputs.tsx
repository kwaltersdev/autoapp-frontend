// material-ui
import { ClassNameMap } from '@mui/styles';
// THIS PROJECT
// components
import StockField from '../common/vehicles/StockField';
import YearSelect from '../common/vehicles/YearSelect';
import MakeSelect from '../common/vehicles/MakeSelect';
import ModelSelect from '../common/vehicles/ModelSelect';
import TrimSelect from '../common/vehicles/TrimSelect';
// types
import { AddVehicleState, EditStockState } from '../../types/Vehicle';

interface VehicleInfoInputsProps {
  mounted: React.MutableRefObject<boolean>;
  addVehicleState: AddVehicleState;
  classes: ClassNameMap<"form" | "inputField">;
};
export default function VehicleInfoInputs(props: VehicleInfoInputsProps): React.ReactElement {
  const { mounted, addVehicleState, classes } = props;
  const {
    stock, setStock,
    stockOkay, setStockOkay,
    stockError, setStockError,
    year, setYear,
    make, setMake,
    model, setModel,
    trim, setTrim,
    addVehicleStatus,
  } = addVehicleState;

  const editStockState: EditStockState = {
    stock, setStock,
    stockOkay, setStockOkay,
    stockError, setStockError,
    addEditVehicleStatus: addVehicleStatus,
  };

  return (
    <div className={classes.form}>
      <StockField className={classes.inputField} editStockState={editStockState} />
      <YearSelect className={classes.inputField} year={year} setYear={setYear} />
      <MakeSelect
        className={classes.inputField}
        parent={{ mounted, make, setMake }}
        allowAddMake
      />
      <ModelSelect
        className={classes.inputField}
        parent={{ mounted, make, model, setModel }}
        allowAddModel
      />
      <TrimSelect
        className={classes.inputField}
        parent={{ mounted, make, model, trim, setTrim }}
        allowAddTrim
      />
    </div>
  );
}