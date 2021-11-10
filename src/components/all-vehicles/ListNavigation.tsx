// react-router-dom
import { useHistory } from 'react-router';
// material-ui
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LastPageIcon from '@mui/icons-material/LastPage';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// THIS PROJECT
// components
import { FlexCenter } from '../common/flex';
// hooks
import { useVehiclePage, useQuery } from '../../hooks';
// types
import { VehiclePage } from '../../types/Vehicle';

interface ListNavigationProps {
  vehiclePage: VehiclePage;
}
export default function ListNavigation(props: ListNavigationProps): React.ReactElement {
  const history = useHistory();
  const { vehiclePage } = props;
  const { docStartNumber, docEndNumber, totalDocs, vehicles } = vehiclePage;
  const dateAddedValues: number[] = [];
  vehicles.forEach(vehicle => dateAddedValues.push(vehicle.dateAdded));
  const maxDateAdded = Math.max(...dateAddedValues);
  const minDateAdded = Math.min(...dateAddedValues);

  const { statusParam, sortParam, perPageParam, pageParam } = useVehiclePage();
  const query = useQuery().toString();

  const firstPageClick = () => {
    docStartNumber !== 1
      && history.push(`/all-vehicles/${statusParam}/${sortParam}/${perPageParam}/first/0?${query}`);
  };

  const prevPageClick = () => {
    docStartNumber !== 1 && sortParam === 'asc'
      ? history.push(`/all-vehicles/${statusParam}/${sortParam}/${perPageParam}/prev/${minDateAdded}?${query}`)
      : history.push(`/all-vehicles/${statusParam}/${sortParam}/${perPageParam}/prev/${maxDateAdded}?${query}`);
  };

  const nextPageClick = () => {
    docEndNumber !== totalDocs && sortParam === 'asc'
      ? history.push(`/all-vehicles/${statusParam}/${sortParam}/${perPageParam}/next/${maxDateAdded}?${query}`)
      : history.push(`/all-vehicles/${statusParam}/${sortParam}/${perPageParam}/next/${minDateAdded}?${query}`);
  };

  const lastPageClick = () => {
    pageParam !== 'last'
      && history.push(`/all-vehicles/${statusParam}/${sortParam}/${perPageParam}/last/0?${query}`);
  };

  if (totalDocs > parseInt(perPageParam)) {
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