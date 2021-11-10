// react
import { useState, useEffect } from 'react';
// date-fns
import 'date-fns';
// material-ui
// import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
// THIS PROJECT
// components
import StockField from '../../../common/vehicles/StockField';
import YearSelect from '../../../common/vehicles/YearSelect';
import MakeSelect from '../../../common/vehicles/MakeSelect';
import ModelSelect from '../../../common/vehicles/ModelSelect';
import TrimSelect from '../../../common/vehicles/TrimSelect';
import CenteredError from '../../../common/CenteredError';
import EditInfoButtons from './EditInfoButtons';
// hooks
import { useCheckMounted } from '../../../../hooks';
// types
import { DetailedVehicle, EditStockState, EditVehicleState } from '../../../../types/Vehicle';
import { IdName, Set } from '../../../../types/misc';
import { PostRequestStatus } from '../../../../types/ServiceRequests';

interface EditInfoProps {
  vehicleDetailsMounted: React.MutableRefObject<boolean>;
  vehicle: DetailedVehicle;
  setVehicle: Set<DetailedVehicle | null>;
  setEdit: Set<boolean>;
  inputFieldStyle?: string;
}
export default function EditInfo(props: EditInfoProps): React.ReactElement {
  const mounted = useCheckMounted();
  const { vehicleDetailsMounted, vehicle, setVehicle, setEdit, inputFieldStyle } = props;
  const { id, stock, year, make, model, trim, dateAdded, dateSold } = vehicle;

  const [editStock, setEditStock] = useState<string>(stock.toString());
  const [stockOkay, setStockOkay] = useState<boolean>(true);
  const [stockError, setStockError] = useState<string>('');
  const [editYear, setEditYear] = useState<string>(year.toString());
  const [editMake, setEditMake] = useState<IdName>(make);
  const [editModel, setEditModel] = useState<IdName>({ id: '', name: '' });
  const [editTrim, setEditTrim] = useState<IdName>({ id: '', name: '' });
  const [editDateAdded, setEditDateAdded] = useState<number>(dateAdded);
  const [editDateSold, setEditDateSold] = useState<number>(dateSold ? dateSold : 0);
  const [editVehicleStatus, setEditVehicleStatus] = useState<PostRequestStatus>('');

  // For setting the initial editModel value (since editMake must be set first)
  // and clearing editModel when the editMake selection is changed
  useEffect(() => {
    if (editMake === make) {
      setEditModel(model);
    } else {
      setEditModel({ id: '', name: '' });
    };
  }, [editMake, make, model]);

  // For setting the initial editTrim value (since editModel must be set first)
  // and clearing editTrim when the editModel selection is changed
  useEffect(() => {
    if (editModel === model) {
      setEditTrim(trim);
    } else {
      setEditTrim({ id: '', name: '' });
    };
  }, [editModel, model, trim]);

  const editStockState: EditStockState = {
    stock: editStock, setStock: setEditStock,
    stockOkay, setStockOkay,
    stockError, setStockError,
    addEditVehicleStatus: editVehicleStatus,
  };

  const editVehicleState: EditVehicleState = {
    vehicleDetailsMounted,
    mounted,
    vehicleId: id,
    stock: stock.toString(),
    editStock,
    stockOkay, setStockOkay,
    setStockError,
    year: year.toString(),
    editYear,
    make, editMake,
    model, editModel,
    trim, editTrim,
    dateAdded, editDateAdded,
    dateSold, editDateSold,
    editVehicleStatus, setEditVehicleStatus,
    setVehicle,
  };

  const handleDateAddedChange = (date: Date | null) => {
    date && setEditDateAdded(date.getTime());
  };

  const handleDateSoldChange = (date: Date | null) => {
    date && setEditDateSold(date.getTime());
  };

  if (editVehicleStatus === 'failed') {
    return <CenteredError errorMessage='Failed to update vehicle info' />;
  };

  return (
    <>
      <StockField className={inputFieldStyle} editStockState={editStockState} />
      <YearSelect className={inputFieldStyle} year={editYear} setYear={setEditYear} />
      <MakeSelect
        className={inputFieldStyle}
        parent={{ mounted, make: editMake, setMake: setEditMake }}
        allowAddMake
      />
      <ModelSelect
        className={inputFieldStyle}
        parent={{ mounted, make: editMake, model: editModel, setModel: setEditModel }}
        allowAddModel
      />
      <TrimSelect
        className={inputFieldStyle}
        parent={{ mounted, make: editMake, model: editModel, trim: editTrim, setTrim: setEditTrim }}
        allowAddTrim
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {/*Edit Date Added Input */}
        <FormControl className={inputFieldStyle}>
          <DatePicker
            label='Date Added'
            value={editDateAdded}
            onChange={handleDateAddedChange}
            renderInput={(params) => <TextField {...params} />}
            maxDate={new Date()}
          />
        </FormControl>
        {/* Edit Date Sold Input */}
        {dateSold && dateSold > 0
          && <FormControl className={inputFieldStyle}>
            <DatePicker
              label='Date Sold'
              value={editDateSold}
              onChange={handleDateSoldChange}
              renderInput={(params) => <TextField {...params} />}
              minDate={new Date(editDateAdded)}
              maxDate={new Date()}
            />
          </FormControl>}
      </LocalizationProvider>
      <EditInfoButtons className={inputFieldStyle} editVehicleState={editVehicleState} setEdit={setEdit} />
    </>
  );
}