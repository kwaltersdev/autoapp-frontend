// material-ui
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// THIS PROJECT
// components
import { FlexCenter } from '../flex';
// types
import { VehiclePage } from '../../../types/Vehicle';
import { Page } from '../../../types/misc';

interface NavigateAccordianVehicleListProps {
  vehiclePage: VehiclePage;
  getVehicles: (page: Page, compare: number) => void;
}
export default function NavigateAccordianVehicleList(props: NavigateAccordianVehicleListProps): React.ReactElement {
  const { vehiclePage, getVehicles } = props;
  const { docStartNumber, docEndNumber, totalDocs, vehicles } = vehiclePage;
  const dateAddedValues: number[] = [];
  vehicles.forEach(vehicle => dateAddedValues.push(vehicle.dateAdded));
  const maxDateAdded = Math.max(...dateAddedValues);
  const minDateAdded = Math.min(...dateAddedValues);


  const firstPageClick = () => {
    getVehicles('first', 0);
  };

  const prevPageClick = () => {
    docStartNumber !== 1 && getVehicles('prev', minDateAdded);
  };

  const nextPageClick = () => {
    docEndNumber !== totalDocs && getVehicles('next', maxDateAdded);
  };

  const lastPageClick = () => {
    docEndNumber !== totalDocs && getVehicles('last', 0);
  };

  if (totalDocs > 5) {
    return (
      <FlexCenter>
        <IconButton
          aria-label='first-page'
          onClick={firstPageClick}
          disabled={docStartNumber === 1}
          size="large">
          <FirstPageIcon />
        </IconButton>
        <IconButton
          aria-label='previous-page'
          onClick={prevPageClick}
          disabled={docStartNumber === 1}
          size="large">
          <NavigateBeforeIcon />
        </IconButton>
        <Typography align='center'>({docStartNumber.toLocaleString()}-{docEndNumber.toLocaleString()}) / {totalDocs.toLocaleString()}</Typography>
        <IconButton
          aria-label='next-page'
          onClick={nextPageClick}
          disabled={docEndNumber === totalDocs}
          size="large">
          <NavigateNextIcon />
        </IconButton>
        <IconButton
          aria-label='last-page'
          onClick={lastPageClick}
          disabled={docEndNumber === totalDocs}
          size="large">
          <LastPageIcon />
        </IconButton>
      </FlexCenter>
    );
  } else {
    return <></>;
  }
}