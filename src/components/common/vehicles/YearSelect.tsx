// react
import { useState } from 'react';
// material-ui
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
// THIS PROJECT
// components
import SelectDialog from '../SelectDialog';
import CustomSelect from '../CustomSelect';
import SelectListItem from '../SelectListItem';
// types
import { Set } from '../../../types/misc';

interface YearSelectProps {
  year: string;
  setYear: Set<string>;
  className?: string;
  button?: boolean;
  TextFieldProps?: any;
  ButtonProps?: any;
};
export default function YearSelect(props: YearSelectProps): React.ReactElement {
  const { year, setYear, className, button, TextFieldProps, ButtonProps } = props;

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  let years = [];
  for (let i = 1980; i <= currentYear; i++) {
    years.unshift(i.toString());
  };

  const [open, setOpen] = useState<boolean>(false);

  const handleYearSelect = (year: string) => {
    setYear(year);
    setOpen(false);
  };

  return (
    <>
      <CustomSelect
        label={button ? 'year' : 'Year*'}
        id='year-select'
        value={year}
        setOpen={setOpen}
        className={className}
        button={button ? true : false}
        TextFieldProps={TextFieldProps}
        ButtonProps={ButtonProps}
      />
      <SelectDialog open={open} setOpen={setOpen}>
        <List>
          <SelectListItem
            onClick={() => handleYearSelect('')}
            textVal={''}
            selectCondition={year === ''}
          />
          <Divider />
          {years.map(yeartmp =>
            <div key={yeartmp}>
              <SelectListItem
                onClick={() => handleYearSelect(yeartmp)}
                textVal={yeartmp}
                selectCondition={yeartmp === year}
              />
              <Divider />
            </div>)}
        </List>
      </SelectDialog >
    </>
  );
}