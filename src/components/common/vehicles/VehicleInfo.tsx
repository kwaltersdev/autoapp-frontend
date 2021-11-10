// material-ui
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
// THIS PROJECT
// types
import { DetailedVehicle } from '../../../types/Vehicle';

const useStyles = makeStyles(theme => ({
  textContainer: {
    width: '60%',
  },
  stockLi: {
    fontSize: 12,
    color: 'black',
  },
  vehicleTextLi: {
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 14,
    color: 'black',
  },
  stock: {
    fontSize: 16,
    color: 'black',
  },
  vehicleText: {
    color: theme.titleColor.darkBlue,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

interface VehicleInfoProps {
  vehicle: DetailedVehicle;
  variant?: any;
  listItem?: boolean;
};
export default function VehicleInfo(props: VehicleInfoProps): React.ReactElement {
  const classes = useStyles();
  const { vehicle, variant, listItem } = props;
  const { stock, year, make, model, trim } = vehicle;

  if (listItem) {
    return (
      <div className={classes.textContainer}>
        <ListItemText>
          <span className={classes.stockLi}>stk#:{stock > 0 && stock}</span>
          <br></br>
          <div className={classes.vehicleTextLi}>{year} {make.name} {model.name} {trim.name}</div>
        </ListItemText>
      </div>
    );
  };

  return (
    <div>
      <Typography variant={variant ? variant : 'body1'}>
        <span className={classes.stock} style={{ fontSize: 14 }}>stk#:{stock > 0 && stock}</span>
        <br></br>
        <div className={classes.vehicleText}> {year} {make.name} {model.name} {trim.name}</div>
      </Typography>
    </div>
  );
}