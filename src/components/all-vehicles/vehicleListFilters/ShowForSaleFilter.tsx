// mui
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// THIS PROJECT
// types
import { Set } from '../../../types/misc';

interface ShowForSaleFilterProps {
  showForSaleTmp: boolean;
  setShowForSaleTmp: Set<boolean>;
}
export default function ShowForSaleFilter(props: ShowForSaleFilterProps): React.ReactElement {
  const { showForSaleTmp, setShowForSaleTmp } = props;

  return (
    <FormControlLabel
      control={
        <Checkbox
          size='small'
          checked={showForSaleTmp}
          onChange={() => showForSaleTmp ? setShowForSaleTmp(false) : setShowForSaleTmp(true)}
        />
      }
      label={`Show "For Sale" Vehicles`}
      sx={{
        margin: 0,
        '& .MuiFormControlLabel-label': {
          color: showForSaleTmp ? 'primary.main' : 'black',
          fontSize: 14
        }
      }}
    />
  );
}