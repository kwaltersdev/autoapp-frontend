// react
import { useState } from 'react';
// react-router-dom
import { Redirect } from 'react-router-dom';
// material-ui
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
// THIS PROJECT
// components
import { ExtraSmallCard, ContentHeader, ContentTitle } from '../common/cardContent';
import { FlexCenter } from '../common/flex';
// hooks
import { useAuthContext } from '../../contexts/AuthContext';

const useStyles = makeStyles((theme: Theme) => ({
  outerFlex: {
    height: '80vh',
    width: '100vw',
    position: 'fixed',
    x: 0,
    y: 0
  },
  card: {
    padding: theme.spacing(3),
  },
  nameField: {
    marginTop: 0,
    margin: theme.spacing(2),
  },
  title: {
    fontFamily: 'Lobster',
  }
}));

export default function LogIn(): React.ReactElement {
  const classes = useStyles();
  const { currentUser, logIn } = useAuthContext();

  const [name, setName] = useState<string>('');

  const changeName = (e: React.ChangeEvent<{ value: unknown; }>): void => {
    setName(e.target.value as string);
  };

  const submit = () => logIn(name);

  return (
    <>
      <FlexCenter className={classes.outerFlex}>
        <ExtraSmallCard className={classes.card}>
          <ContentHeader>
            <FlexCenter>
              <ContentTitle className={classes.title} variant='h5'>AutoApp</ContentTitle>
            </FlexCenter>
            <Divider />
          </ContentHeader>
          <FlexCenter flexDirection='column'>
            <TextField id='user-name' label="Name" variant='outlined' size='small'
              className={classes.nameField} onChange={changeName} value={name} autoComplete='off' />
            <Button onClick={submit} color='primary' variant='contained'
              disabled={name.length > 0 ? false : true}>
              Log In
            </Button>
          </FlexCenter>
        </ExtraSmallCard>
      </FlexCenter>
      {currentUser && <Redirect to='/' />}
    </>
  );
}