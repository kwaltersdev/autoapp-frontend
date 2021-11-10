// material-ui
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const ReadonlyTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '&.MuiTextField-root': {
    '& .Mui-disabled': {
      WebkitTextFillColor: 'black',
      '& .label': {
        WebkitTextFillColor: 'gray'
      },
    },
  }
}));

export default ReadonlyTextField;

// text field still needs to be 'disabled' when used in order to become 'readonly'
// the label must be assigne a <span /> element with a className of 'label'
// e.g. <span className='label'>label</span>