// react-router-dom
import { useHistory } from 'react-router';
// material-ui
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// THIS PROJECT
// hooks
import { useVehiclePage, useQuery } from '../../hooks';
// types
import { ListOrder } from '../../types/misc';

interface VehicleOrderProps {
  sort: ListOrder;
  setSort: (sort: ListOrder) => void;
};
export default function VehicleOrder(props: VehicleOrderProps): React.ReactElement {
  const history = useHistory();
  const { sort, setSort } = props;
  const { statusParam, perPageParam } = useVehiclePage();
  const query = useQuery().toString();

  const vehicleOrderClick = () => {
    let newSort: ListOrder;
    sort === 'asc' ? newSort = 'desc' : newSort = 'asc';
    setSort(newSort);
    history.push(`/all-vehicles/${statusParam}/${newSort}/${perPageParam}/first/0?${query}`);
  };

  return (
    <Button
      size='small'
      startIcon={<ArrowDownwardIcon />}
      aria-controls='sort-menu'
      aria-haspopup='true'
      onClick={vehicleOrderClick}
    >
      {sort === 'asc' ? 'oldest' : 'recent'}
    </Button>
  );
}