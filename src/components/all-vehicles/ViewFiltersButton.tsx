// material-ui
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Badge from '@mui/material/Badge';
import { Theme } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
// types
import { Set } from '../../types/misc';

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: 0,
      top: 20,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }),
)(Badge);

interface ViewFiltersButtonProps {
  viewFilters: boolean;
  setViewFilters: Set<boolean>;
  filterCount: number;
}
export default function ViewFiltersButton(props: ViewFiltersButtonProps): React.ReactElement {
  const { viewFilters, setViewFilters, filterCount } = props;

  return (

    <Button
      size='small'
      startIcon={viewFilters ? <VisibilityOffIcon /> : <VisibilityIcon />}
      onClick={() => (viewFilters ? setViewFilters(false) : setViewFilters(true))}
    >
      <StyledBadge badgeContent={filterCount} color='secondary'>
        filters
      </StyledBadge>
    </Button>

  );
}