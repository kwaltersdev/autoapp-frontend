// react
import { useState } from 'react';
// react-router-dom
import { useHistory } from 'react-router-dom';
// material-ui
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
// THS PROJECT
// hooks
import { useVehiclePage } from '../../hooks';
// types
import { VehicleStatus } from '../../types/Vehicle';

const useStyles = makeStyles((theme: Theme) => ({
  trash: {
    color: theme.palette.secondary.main,
  },
  sold: {
    color: theme.palette.success.main,
  },
  active: {
    color: theme.palette.primary.main,
  },
}));

interface StatusFilterProps {
  filter: VehicleStatus;
  setFilter: (filter: VehicleStatus) => void;
}
export default function StatusFilter(props: StatusFilterProps): React.ReactElement {
  const classes = useStyles();
  const history = useHistory();
  const { statusParam, sortParam, perPageParam } = useVehiclePage();

  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);

  const handleFilterClick = (e: React.MouseEvent<HTMLElement>) => {
    setFilterAnchor(e.currentTarget);
  };

  const handleFilterClose = (newStatus: VehicleStatus) => {
    setFilterAnchor(null);
    history.push(`/all-vehicles/${newStatus}/${sortParam}/${perPageParam}/first/0`);
  };

  let filterDisplay: JSX.Element;

  if (statusParam === 'trash') {
    filterDisplay = <span className={classes.trash}>TRASH</span>;
  } else if (statusParam === 'sold') {
    filterDisplay = <span className={classes.sold}>SOLD</span>;
  } else {
    filterDisplay = <span className={classes.active}>ACTIVE</span>;
  };

  return (
    <>
      <Button size='small' startIcon={<FilterListIcon />} aria-controls='filter-menu' aria-haspopup='true' onClick={handleFilterClick}>
        {filterDisplay}
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={filterAnchor}
        keepMounted
        open={Boolean(filterAnchor)}
        onClose={() => handleFilterClose(statusParam)}
      >
        <MenuItem onClick={() => handleFilterClose('active')}>Active</MenuItem>
        <MenuItem onClick={() => handleFilterClose('sold')}>Sold</MenuItem>
        <MenuItem onClick={() => handleFilterClose('trash')}>Trash</MenuItem>
      </Menu>
    </>
  );
}
