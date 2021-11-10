// material-ui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ExpandMore from '@mui/icons-material/ExpandMore';

interface CustomSelectProps {
  label: string;
  id: string;
  value: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
  className?: string,
  button?: boolean,
  TextFieldProps?: any,
  ButtonProps?: any;
};
export default function CustomSelect(props: CustomSelectProps): React.ReactElement {
  const { label, id, value, setOpen, disabled, className, button, TextFieldProps, ButtonProps } = props;

  if (button) {
    return (
      <Button
        id={id}
        className={className && className}
        onClick={() => { !disabled && setOpen(true); }}
        variant='outlined'
        size='small'
        color={!value ? 'inherit' : 'primary'}
        {...ButtonProps}
        disabled={disabled ? true : false}
      >
        {value ? value : label}
      </Button>
    );
  } else {
    return (
      <TextField
        className={className && className}
        label={label}
        id={id}
        value={value}
        variant='outlined'
        InputProps={{
          endAdornment: <ExpandMore />,
          readOnly: true,
          style: {
            cursor: 'pointer'
          }
        }}
        inputProps={{
          style: {
            cursor: 'pointer'
          }
        }}
        onClick={() => { !disabled && setOpen(true); }}
        {...TextFieldProps}
        disabled={disabled ? true : false}
      />
    );
  };
}