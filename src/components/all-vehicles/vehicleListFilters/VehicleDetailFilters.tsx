// mui
import makeStyles from '@mui/styles/makeStyles';
// THIS PROJECT
// components
import { FlexStart } from '../../common/flex';
import YearSelect from '../../common/vehicles/YearSelect';
import MakeSelect from '../../common/vehicles/MakeSelect';
import ModelSelect from '../../common/vehicles/ModelSelect';
import TrimSelect from '../../common/vehicles/TrimSelect';
// types
import { VehicleDetailFilterState } from "../../../types/Vehicle";

const useStyles = makeStyles((theme) => ({
  select: {
    margin: theme.spacing(.5),
  }
}));

interface VehicleDetailFiltersProps {
  mounted: React.MutableRefObject<boolean>;
  vehicleDetailFilterState: VehicleDetailFilterState;
}
export default function VehicleDetailFilters(props: VehicleDetailFiltersProps): React.ReactElement {
  const classes = useStyles();
  const { mounted, vehicleDetailFilterState } = props;
  const {
    yearFilterTmp, setYearFilterTmp,
    makeFilterTmp, setMakeFilterTmp,
    modelFilterTmp, setModelFilterTmp,
    trimFilterTmp, setTrimFilterTmp,
  } = vehicleDetailFilterState;

  return (
    <FlexStart flexWrap='wrap'>
      <YearSelect
        className={classes.select}
        year={yearFilterTmp}
        setYear={setYearFilterTmp}
        button
      />
      <MakeSelect
        parent={{
          mounted,
          make: makeFilterTmp,
          setMake: setMakeFilterTmp
        }}
        className={classes.select}
        button
      />
      <ModelSelect
        parent={{
          mounted,
          make: makeFilterTmp,
          model: modelFilterTmp,
          setModel: setModelFilterTmp
        }}
        className={classes.select}
        button
      />
      <TrimSelect
        parent={{
          mounted,
          make: makeFilterTmp,
          model: modelFilterTmp,
          trim: trimFilterTmp,
          setTrim: setTrimFilterTmp
        }}
        className={classes.select}
        button
      />
    </FlexStart>);


}