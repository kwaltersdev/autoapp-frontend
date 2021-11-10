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
  const stock = vehicle.stock;
  const year = vehicle.year;
  const make = vehicle.make.name;
  const model = vehicle.model.name;
  const trim = vehicle.trim.name;
  const dateAdded = new Date(vehicle.dateAdded).toLocaleDateString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const dateSold = vehicle.dateSold && new Date(vehicle.dateSold).toLocaleDateString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' });

  return (
    <>
      <ReadonlyTextField disabled className={inputFieldStyle} label={<span className={'label'}>Stock #</span>} value={stock > 0 ? stock : ' '} />
      <ReadonlyTextField disabled className={inputFieldStyle} label={<span className={'label'}>Year</span>} value={year} />
      <ReadonlyTextField disabled className={inputFieldStyle} label={<span className={'label'}>Make</span>} value={make} />
      <ReadonlyTextField disabled className={inputFieldStyle} label={<span className={'label'}>Model</span>} value={model} />
      <ReadonlyTextField disabled className={inputFieldStyle} label={<span className={'label'}>Trim</span>} value={trim ? trim : ' '} />
      <ReadonlyTextField disabled className={inputFieldStyle} label={<span className={'label'}>Date Added</span>} value={dateAdded} />
      {vehicle.dateSold && vehicle.dateSold > 0
        && <ReadonlyTextField disabled className={inputFieldStyle} label={<span className={'label'}>Date Sold</span>} value={dateSold} />}
    </>
  );
}