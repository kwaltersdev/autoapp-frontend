// react
import { useState, useEffect } from 'react';
// react-router-dom
import { useHistory } from 'react-router';
// mui
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
// THIS PROJECT
// components
import { FlexEnd, FlexSpaceBtwn } from '../../common/flex';
import VehicleDetailFilters from './VehicleDetailFilters';
import DateRangeFilters from './DateRangeFilters';
import ShowForSaleFilter from './ShowForSaleFilter';
// hooks
import { useVehiclePage, useQuery } from '../../../hooks';
// types
import { IdName, Set } from '../../../types/misc';
import { DateRangeFilterState, VehicleDetailFilterState } from '../../../types/Vehicle';

const useStyles = makeStyles((theme) => ({
  filterActions: {
    marginTop: theme.spacing(1),
  },
}));

interface VehicleListFiltersProps {
  mounted: React.MutableRefObject<boolean>;
  setViewFilters: Set<boolean>;
  setFilterCount: Set<number>;
};
export default function VehicleListFilters(props: VehicleListFiltersProps): React.ReactElement {
  const classes = useStyles();
  const history = useHistory();

  const { statusParam, sortParam, perPageParam } = useVehiclePage();
  const { mounted, setViewFilters, setFilterCount } = props;

  // UI STATE
  // vehicle details
  const [yearFilterTmp, setYearFilterTmp] = useState<string>('');
  const [makeFilterTmp, setMakeFilterTmp] = useState<IdName>({ id: '', name: '' });
  const [modelFilterTmp, setModelFilterTmp] = useState<IdName>({ id: '', name: '' });
  const [trimFilterTmp, setTrimFilterTmp] = useState<IdName>({ id: '', name: '' });
  // date ranges
  const [addedAfterFilterTmp, setAddedAfterFilterTmp] = useState<number | null>(null);
  const [addedBeforeFilterTmp, setAddedBeforeFilterTmp] = useState<number | null>(null);
  const [soldAfterFilterTmp, setSoldAfterFilterTmp] = useState<number | null>(null);
  const [soldBeforeFilterTmp, setSoldBeforeFilterTmp] = useState<number | null>(null);
  // show 'For Sale'
  const [showForSaleTmp, setShowForSaleTmp] = useState<boolean>(false);

  // APPLIED FILTERS STATE
  // vehicle details
  const [yearFilter, setYearFilter] = useState<string>('');
  const [makeFilter, setMakeFilter] = useState<IdName>({ id: '', name: '' });
  const [modelFilter, setModelFilter] = useState<IdName>({ id: '', name: '' });
  const [trimFilter, setTrimFilter] = useState<IdName>({ id: '', name: '' });
  // date ranges
  const [addedAfterFilter, setAddedAfterFilter] = useState<number | null>(null);
  const [addedBeforeFilter, setAddedBeforeFilter] = useState<number | null>(null);
  const [soldAfterFilter, setSoldAfterFilter] = useState<number | null>(null);
  const [soldBeforeFilter, setSoldBeforeFilter] = useState<number | null>(null);
  // show 'For Sale'
  const [showForSale, setShowForSale] = useState<boolean>(false);

  // SETTING FILTERS IN THE UI ON REFRESH
  // utilizing the query string at th end of the url
  const query = useQuery();
  // vehicle details
  const yearQuery = query.get('year');
  const makeQuery = query.get('make');
  const modelQuery = query.get('model');
  const trimQuery = query.get('trim');
  // date ranges
  const addedAfterQuery = query.get('addedAfter');
  const addedBeforeQuery = query.get('addedBefore');
  const soldAfterQuery = query.get('soldAfter');
  const soldBeforeQuery = query.get('soldBefore');
  // show 'For Sale'
  const showForSaleQuery = query.get('forSale');

  // set filters values based on queries
  useEffect(() => {
    yearQuery ? setYearFilterTmp(yearQuery) : setYearFilterTmp('');
    yearQuery ? setYearFilter(yearQuery) : setYearFilter('');

    const makeTmp = makeQuery ? makeQuery.split('-') : ['', ''];
    setMakeFilterTmp({ id: makeTmp[1], name: makeTmp[0] });
    setMakeFilter({ id: makeTmp[1], name: makeTmp[0] });

    const modelTmp = modelQuery ? modelQuery.split('-') : ['', ''];
    setModelFilterTmp({ id: modelTmp[1], name: modelTmp[0] });
    setModelFilter({ id: modelTmp[1], name: modelTmp[0] });

    addedAfterQuery ? setAddedAfterFilterTmp(parseFloat(addedAfterQuery)) : setAddedAfterFilterTmp(null);
    addedAfterQuery ? setAddedAfterFilter(parseFloat(addedAfterQuery)) : setAddedAfterFilter(null);

    addedBeforeQuery ? setAddedBeforeFilterTmp(parseFloat(addedBeforeQuery)) : setAddedBeforeFilterTmp(null);
    addedBeforeQuery ? setAddedBeforeFilter(parseFloat(addedBeforeQuery)) : setAddedBeforeFilter(null);

    soldAfterQuery ? setSoldAfterFilterTmp(parseFloat(soldAfterQuery)) : setSoldAfterFilterTmp(null);
    soldAfterQuery ? setSoldAfterFilter(parseFloat(soldAfterQuery)) : setSoldAfterFilter(null);

    soldBeforeQuery ? setSoldBeforeFilterTmp(parseFloat(soldBeforeQuery)) : setSoldBeforeFilterTmp(null);
    soldBeforeQuery ? setSoldBeforeFilter(parseFloat(soldBeforeQuery)) : setSoldBeforeFilter(null);

    const showForSaleQueryTmp = showForSaleQuery === 'true' ? true : false;
    setShowForSaleTmp(showForSaleQueryTmp);
    setShowForSale(showForSaleQueryTmp);
  }, [yearQuery, makeQuery, modelQuery, trimQuery, addedAfterQuery, addedBeforeQuery, soldAfterQuery, soldBeforeQuery, showForSaleQuery]);

  // have to 'step through' make filter before setting model filter because make filter clears model filter when it is set
  useEffect(() => {
    const modelTmp = modelQuery ? modelQuery.split('-') : ['', ''];
    setModelFilterTmp({ id: modelTmp[1], name: modelTmp[0] });
    setModelFilter({ id: modelTmp[1], name: modelTmp[0] });
  }, [makeFilter, modelQuery]);

  // have to 'step through' model filter before setting trim filter because model filter clears trim filter when it is set
  useEffect(() => {
    const trimTmp = trimQuery ? trimQuery.split('-') : ['', ''];
    setTrimFilterTmp({ id: trimTmp[1], name: trimTmp[0] });
    setTrimFilter({ id: trimTmp[1], name: trimTmp[0] });
  }, [modelFilter, trimQuery]);

  // ^^ SETTING FILTERS IN THE UI ON REFRESH ^^

  const removeFiltersClick = () => {
    // vehicle details
    setYearFilter(''); setYearFilterTmp('');
    setMakeFilter({ id: '', name: '' }); setMakeFilterTmp({ id: '', name: '' });
    setModelFilter({ id: '', name: '' }); setModelFilterTmp({ id: '', name: '' });
    setTrimFilter({ id: '', name: '' }); setTrimFilterTmp({ id: '', name: '' });
    // date ranges
    setAddedAfterFilter(null); setAddedAfterFilterTmp(null);
    setAddedBeforeFilter(null); setAddedBeforeFilterTmp(null);
    setSoldAfterFilter(null); setSoldAfterFilterTmp(null);
    setSoldBeforeFilter(null); setSoldBeforeFilterTmp(null);
    // show 'For Sale'
    setShowForSale(false); setShowForSaleTmp(false);

    setViewFilters(false);
    history.push(`/all-vehicles/${statusParam}/${sortParam}/${perPageParam}/first/0`);
  };

  const applyFiltersClick = () => {
    // sync filterTmps with filters
    // vehicle details
    setYearFilter(yearFilterTmp);
    setMakeFilter(makeFilterTmp);
    setModelFilter(modelFilterTmp);
    setTrimFilter(trimFilterTmp);
    // date ranges
    setAddedAfterFilter(addedAfterFilterTmp);
    setAddedBeforeFilter(addedBeforeFilterTmp);
    setSoldAfterFilter(soldAfterFilterTmp);
    setSoldBeforeFilter(soldBeforeFilterTmp);
    // show 'For Sale'
    setViewFilters(false);

    // create our query string to append to the end of our url, and then push to that url
    const queries = [];
    // vehicle details
    yearFilterTmp && queries.push(`year=${yearFilterTmp}`);
    makeFilterTmp.id && queries.push(`make=${makeFilterTmp.name}-${makeFilterTmp.id}`);
    modelFilterTmp.id && queries.push(`model=${modelFilterTmp.name}-${modelFilterTmp.id}`);
    trimFilterTmp.id && queries.push(`trim=${trimFilterTmp.name}-${trimFilterTmp.id}`);
    // date ranges
    addedAfterFilterTmp && queries.push(`addedAfter=${addedAfterFilterTmp}`);
    addedBeforeFilterTmp && queries.push(`addedBefore=${addedBeforeFilterTmp}`);
    soldAfterFilterTmp && queries.push(`soldAfter=${soldAfterFilterTmp}`);
    soldBeforeFilterTmp && queries.push(`soldBefore=${soldBeforeFilterTmp}`);
    // show 'For Sale'
    showForSaleTmp && queries.push(`forSale=${showForSaleTmp}`);

    const queryString = `${queries.join('&')}`;
    history.push(`/all-vehicles/${statusParam}/${sortParam}/${perPageParam}/first/0?${queryString}`);
  };

  const disableApplyFilters = (
    yearFilter === yearFilterTmp &&
    makeFilter.id === makeFilterTmp.id &&
    modelFilter.id === modelFilterTmp.id &&
    trimFilter.id === trimFilterTmp.id &&
    addedAfterFilterTmp === addedAfterFilter &&
    addedBeforeFilterTmp === addedBeforeFilter &&
    soldAfterFilterTmp === soldAfterFilter &&
    soldBeforeFilterTmp === soldBeforeFilter &&
    showForSaleTmp === showForSale
  );

  // GET THE FILTER COUNT
  useEffect(() => {
    let value: number = 0;
    // vehicle detail filters
    yearFilter !== '' && value++;
    const calculate = (filter: IdName) => filter.name !== '' && value++;
    [makeFilter, modelFilter, trimFilter].forEach(filter => calculate(filter));
    // date range filters
    (addedAfterFilter || addedBeforeFilter) && value++;
    (soldAfterFilter || soldBeforeFilter) && value++;
    // show 'For Sale'
    showForSale && value++;

    setFilterCount(value);
  }, [yearFilter, makeFilter, modelFilter, trimFilter, addedAfterFilter, addedBeforeFilter, soldAfterFilter, soldBeforeFilter, showForSale, setFilterCount]);

  // CHILD STATE OBJECTS
  const vehicleDetailFilterState: VehicleDetailFilterState = {
    yearFilterTmp, setYearFilterTmp,
    makeFilterTmp, setMakeFilterTmp,
    modelFilterTmp, setModelFilterTmp,
    trimFilterTmp, setTrimFilterTmp,
  };

  const dateRangeFilterState: DateRangeFilterState = {
    addedAfterFilterTmp, setAddedAfterFilterTmp,
    addedBeforeFilterTmp, setAddedBeforeFilterTmp,
    soldAfterFilterTmp, setSoldAfterFilterTmp,
    soldBeforeFilterTmp, setSoldBeforeFilterTmp,
  };

  return (
    <>
      <FlexSpaceBtwn flexWrap='wrap'>
        <VehicleDetailFilters
          mounted={mounted}
          vehicleDetailFilterState={vehicleDetailFilterState}
        />
        <DateRangeFilters dateRangeFilterState={dateRangeFilterState} />
        {statusParam === 'active'
          && <ShowForSaleFilter
            showForSaleTmp={showForSaleTmp}
            setShowForSaleTmp={setShowForSaleTmp}
          />}
      </FlexSpaceBtwn>
      <FlexEnd className={classes.filterActions}>
        <Button
          onClick={removeFiltersClick}
        >
          REMOVE FILTERS
        </Button>
        <Button
          onClick={applyFiltersClick}
          disabled={disableApplyFilters}
          color='primary'
        >
          APPLY FILTERS
        </Button>
      </FlexEnd>
    </>
  );
}