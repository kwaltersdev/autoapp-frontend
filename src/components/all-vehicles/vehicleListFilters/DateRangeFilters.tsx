// mui
import makeStyles from '@mui/styles/makeStyles';
// THIS PROJECT
// components
import { FlexStart } from '../../common/flex';
import DateAddedSelect from '../../common/vehicles/DateAddedSelect';
import DateSoldSelect from '../../common/vehicles/DateSoldSelect';
// hooks
import { useVehiclePage } from '../../../hooks';
// types
import { DateRangeFilterState } from "../../../types/Vehicle";

const useStyles = makeStyles((theme) => ({
  select: {
    margin: theme.spacing(.5),
  }
}));

interface DateRangeFiltersProps {
  dateRangeFilterState: DateRangeFilterState;
}
export default function DateRangeFilters(props: DateRangeFiltersProps): React.ReactElement {
  const classes = useStyles();
  const { statusParam } = useVehiclePage();
  const {
    addedAfterFilterTmp, setAddedAfterFilterTmp,
    addedBeforeFilterTmp, setAddedBeforeFilterTmp,
    soldAfterFilterTmp, setSoldAfterFilterTmp,
    soldBeforeFilterTmp, setSoldBeforeFilterTmp,
  } = props.dateRangeFilterState;

  return (
    <FlexStart flexWrap='wrap'>
      <DateAddedSelect
        after={addedAfterFilterTmp}
        setAfter={setAddedAfterFilterTmp}
        before={addedBeforeFilterTmp}
        setBefore={setAddedBeforeFilterTmp}
        className={classes.select}
      />
      {statusParam === 'sold' &&
        <DateSoldSelect
          after={soldAfterFilterTmp}
          setAfter={setSoldAfterFilterTmp}
          before={soldBeforeFilterTmp}
          setBefore={setSoldBeforeFilterTmp}
          className={classes.select}
        />
      }
    </FlexStart>
  );
}