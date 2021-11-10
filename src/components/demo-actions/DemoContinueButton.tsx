// react
import { useEffect, useState } from 'react';
// material-ui
import Button from '@mui/material/Button';
// THIS PROJECT
// components
import DemoDialog from './DemoDialog';
// types
import { DemoState } from '../../types/Demo';

interface DemoContinueButtonProps {
  demoState: DemoState;
};
export default function DemoContinueButton(props: DemoContinueButtonProps): React.ReactElement {
  const { demoState } = props;

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const {
    loading,
    clearDatabase,
    addVehicleDescriptors,
    addStages,
    generateVehicles,
    vehiclesAmountError,
    monthsError
  } = demoState;

  useEffect(() => { loading && setOpenDialog(false); }, [loading]);
  return (
    <>
      <Button
        color='primary'
        variant='outlined'
        onClick={() => setOpenDialog(true)}
        disabled={(!clearDatabase && !addVehicleDescriptors && !addStages && !generateVehicles) || (vehiclesAmountError !== '' || monthsError !== '')}
      >
        continue
      </Button>
      <DemoDialog demoState={demoState} open={openDialog} setOpen={setOpenDialog} />
    </>
  );
}