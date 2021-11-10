// react
import { useEffect, useState } from 'react';
// mui
import Settings from '@mui/icons-material/Settings';
import TextField from '@mui/material/TextField';
import { Select, Typography, FormControl, MenuItem, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
// THIS PROJECT
// components
import { LargeCard, LargeContent, ContentHeader, IconContentTitle, ContentPaper } from '../common/cardContent';
import { FlexEnd, FlexSpaceBtwn } from '../common/flex';
// context
import { useDemoContext } from '../../contexts/DemoContext';
import React from 'react';
import { DbSelection } from '../../types/Demo';

// all of this complicated looking code is to resolve a typescript error.
// basically we couldn't assign variant 'outlined' to the LoadingDelayField because 
// typescript wasn't recognizing that 'outlined' was assignable to {type 'filled'} | {type: 'outlined'}
interface NumberInputProps {
  variant?: 'outlined';
}
const NumberInput = styled(TextField, {
  shouldForwardProp: (prop) =>
    prop !== 'variant',
  name: 'LoadingDelayField',
  slot: 'Root',
  overridesResolver: (props, styles) => [
    styles.root,
    props.variant === 'outlined' && styles.outlined,
  ]
})<NumberInputProps>(({ theme }) => ({
  width: '150px',
  marginLeft: theme.spacing(2),
  '&.MuiTextField-root': {
    textAlign: 'center',
  }
}));

const ButtonFlex = styled(FlexEnd)(({ theme }) => ({
  margin: theme.spacing(2),
}));

export default function DemoSettings(): React.ReactElement {
  const { loadingTime, saveLoadingTime, db, saveDb } = useDemoContext();
  const [loadingTimeInput, setLoadingTimeInput] = useState<string>(loadingTime.toLocaleString('en-US'));
  // need a separate state variable for the actual loadingTime number variable, not the input string
  const [loadingTimeNum, setLoadingTimeNum] = useState<number>(loadingTime);
  const [inputError, setInputError] = useState<string>('');

  const changeLoadingTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const loadingTimeStringTmp = e.target.value.trim().replace(/[^0-9]/g, '');
    const loadingTimeNumTmp = parseInt(loadingTimeStringTmp);
    if (loadingTimeNumTmp > 10000) {
      setInputError('cannot exceed 10 seconds');
    } else {
      setInputError('');
      loadingTimeStringTmp ? setLoadingTimeNum(parseInt(loadingTimeStringTmp)) : setLoadingTimeNum(0);
      const loadingTimeString = loadingTimeStringTmp
        // delete leading zeros
        .replace(/^0+(?!$)/g, '')
        // add comma seperators
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      setLoadingTimeInput(loadingTimeString);
    }
  };

  const onBlurLoadingTime = () => {
    if (loadingTimeNum > 10000) {
      setLoadingTimeInput('0');
      setInputError('cannot exceed 10 seconds');
    } else {
      setInputError('');
    }
  };

  const [dbInput, setDbInput] = useState<DbSelection | null>(db);

  const handleDbChange = (event: SelectChangeEvent) => {
    setDbInput(event.target.value as DbSelection);
  };

  // necessary to change the loadingTimeInput state variable whenever it is reset in the context,
  // since the value of our input comes from this state variable and not directly from the context
  useEffect(() => {
    const loadingTimeString = loadingTime.toLocaleString('en-US');
    setLoadingTimeInput(loadingTimeString);
  }, [loadingTime]);

  return (
    <LargeCard>
      <LargeContent>
        <ContentHeader>
          <IconContentTitle icon={<Settings color='primary' />} variant='h5'>Demo Settings</IconContentTitle>
        </ContentHeader>
        <ContentPaper>
          <FlexSpaceBtwn>
            <Typography>Simulated Loading Delay (milliseconds):</Typography>
            <NumberInput
              value={loadingTimeInput}
              onChange={changeLoadingTime}
              onBlur={onBlurLoadingTime}
              size='small'
              inputProps={{ sx: { textAlign: 'right' } }}
              error={inputError ? true : false}
              helperText={inputError}
            />
          </FlexSpaceBtwn>
          <ButtonFlex>
            <Button
              disabled={loadingTime === loadingTimeNum}
              onClick={() => saveLoadingTime(loadingTimeNum)}>Save</Button>
          </ButtonFlex>
          <FlexSpaceBtwn>
            <Typography>Database:</Typography>
            <FormControl>
              <Select
                value={dbInput ? dbInput : ''}
                onChange={handleDbChange}
                sx={{ width: '150px' }}
                size='small'
              >
                <MenuItem value='mongodb'>MongoDB</MenuItem>
                <MenuItem value='mysql'>MySQL</MenuItem>
              </Select>
            </FormControl>
          </FlexSpaceBtwn>
          <ButtonFlex>
            <Button
              disabled={db === dbInput}
              onClick={() => saveDb(dbInput)}
            >
              Save
            </Button>
          </ButtonFlex>
        </ContentPaper>
      </LargeContent>
    </LargeCard>
  );
}
