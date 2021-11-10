// react
import { useEffect, useCallback } from 'react';
// material-ui
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
// THIS PROJECT
// components
import NextStockButton from './NextStockButton';
// types
import { EditStockState } from '../../../types/Vehicle';

interface StockFieldProps {
  editStockState: EditStockState;
  className?: string;
};
export default function StockField(props: StockFieldProps): React.ReactElement {
  const { editStockState, className } = props;
  const { stock, setStock, stockOkay, setStockOkay, stockError, setStockError } = editStockState;

  const changeStock = (e: React.ChangeEvent<{ value: unknown; }>): void => {
    setStock(e.target.value as string);
  };

  const checkStock = useCallback(() => {
    const stockFormatTest = /^[0-9]{5}$/;
    if (!stockFormatTest.test(stock) && stock !== '') {
      setStockOkay(false);
      setStockError('must be 5 digits');
    } else if (stockError !== 'stk# already exists') {
      setStockOkay(true);
      setStockError('');
    };
  }, [setStockError, setStockOkay, stock, stockError]);

  useEffect(() => {
    if (!stockOkay) checkStock();
  }, [stock, stockOkay, checkStock]);

  return (
    <TextField
      className={className && className}
      error={stockError ? true : false}
      label={'Stock #'}
      helperText={stockError}
      variant='outlined'
      value={stock !== '0' ? stock : ' '}
      onChange={changeStock}
      onBlur={checkStock}
      InputProps={{
        endAdornment:
          <InputAdornment position='end'>
            <NextStockButton editStockState={editStockState} />
          </InputAdornment>
      }}
    />
  );
}