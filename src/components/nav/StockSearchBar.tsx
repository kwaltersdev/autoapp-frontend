// react
import { useState } from 'react';
// react-router-dom
import { useHistory, useLocation } from 'react-router-dom';
// material-ui
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Theme, alpha } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';

const StyledInputAdornment = styled(InputAdornment)(({ theme }) => ({
  color: theme.titleColor.lightBlue,
  opacity: '50%',

}));

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    paddingLeft: theme.spacing(.5),
    display: 'flex',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
}));

export default function StockSearchBar(): React.ReactElement {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const stockFormatTest = /^[0-9]{5}$/;

  // STOCK SEARCH
  const [searchStk, setSearchStk] = useState<string>('');
  const [stockError, setStockError] = useState<string>('');

  const handleChangeSearch = (e: React.ChangeEvent<{ value: string; }>): void => {
    setSearchStk(e.target.value);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    const previous = location.pathname;
    if (e.key === 'Enter') {
      if (searchStk !== '') {
        if (!stockFormatTest.test(searchStk)) {
          setStockError('must be 5 digits');
        } else {
          history.push(`/vehicle-details/stock/${searchStk}/stage?prev=${previous}`);
          setSearchStk('');
        }
      }
    } else {
      setStockError('');
    };
  };

  return (
    < TextField className={classes.search}
      size='small'
      placeholder="Stk#"
      error={stockError ? true : false}
      helperText={stockError}
      inputProps={{ 'aria-label': 'search' }
      }
      InputProps={{
        startAdornment: (
          <StyledInputAdornment position='start'>
            <SearchIcon color='inherit' />
          </StyledInputAdornment>
        ),
        classes: {
          root: classes.inputRoot
        }
      }}
      value={searchStk}
      onChange={handleChangeSearch}
      onKeyDown={handleSearchKeyPress}
    />
  );
}