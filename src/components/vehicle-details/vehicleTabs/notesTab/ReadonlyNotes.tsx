// THIS PROJECT
// components
import ReadonlyTextField from '../../../common/ReadonlyTextField';
// types
import { DetailedVehicle } from '../../../../types/Vehicle';

interface ReadonlyInfoProps {
  vehicle: DetailedVehicle;
  inputFieldStyle?: string;
};
export default function ReadonlyInfoTab(props: ReadonlyInfoProps): React.ReactElement {
  const { vehicle, inputFieldStyle } = props;
  const { notes } = vehicle;

  return (
    <ReadonlyTextField disabled label={notes === '' ? <span className='label'>...</span> : <span className='label'>Notes</span>} value={notes} className={inputFieldStyle} multiline maxRows={5} />
  );
};