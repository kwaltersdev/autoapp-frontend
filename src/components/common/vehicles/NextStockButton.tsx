// react
import { useState, useEffect, useCallback } from 'react';
// material-ui
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
// THIS PROJECT
// hooks
import { useCheckMounted } from '../../../hooks';
// contexts
import { useDemoContext } from '../../../contexts/DemoContext';
// services
import { getNextStock as getNextStockService } from '../../../services/vehicles';
// types
import { GetRequestStatus } from '../../../types/ServiceRequests';
import { EditStockState } from '../../../types/Vehicle';
import { FlexEnd } from '../flex';


const useStyles = makeStyles((theme) => ({
  field: {
    // textAlign: 'left',
    width: 'calc(100% - 75px)',
  },
  nextStockButton: {
    width: 75,
  },
}));

interface NextStockButtonProps {
  editStockState: EditStockState;
};
export default function NextStockButton(props: NextStockButtonProps): React.ReactElement {
  const classes = useStyles();
  const mounted = useCheckMounted();
  const { delay } = useDemoContext();
  const { setStock, setStockError, addEditVehicleStatus } = props.editStockState;
  const [nextStock, setNextStock] = useState('');
  const [getNextStockStatus, setGetNextStockStatus] = useState<GetRequestStatus>('loading');

  const useNextStock = (): void => {
    setStock(nextStock);
    setStockError('');
  };

  const getNextStock = useCallback(async () => {
    setGetNextStockStatus('loading');
    await delay();
    getNextStockService()
      .then(result => {
        mounted.current && result.data && setNextStock(result.data.nextStock.toString());
        mounted.current && setGetNextStockStatus(result.status as GetRequestStatus);
      }, e => {
        mounted.current && setGetNextStockStatus('failed');
        console.error(e);
      });
  },
    [delay, mounted]
  );

  useEffect(() => {
    if (addEditVehicleStatus === '' || addEditVehicleStatus === 'success') {
      getNextStock();
    };
  }, [addEditVehicleStatus, getNextStock]);

  if (getNextStockStatus === 'loading') {
    return (
      <FlexEnd className={classes.nextStockButton}>
        <CircularProgress size={25} />
      </FlexEnd>
    );
  };

  if (getNextStockStatus === 'failed') {
    return (
      <Button className={classes.nextStockButton} disabled>
        error
      </Button>
    );
  };

  return (
    <Button className={classes.nextStockButton} onClick={useNextStock}>
      USE NEXT
    </Button>
  );
}