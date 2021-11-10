// react-router-dom
import makeStyles from '@mui/styles/makeStyles';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
// THIS PROJECT
// components
import AccordionPaper from '../AccordionPaper';
import StageVehicleList from '../../stages/StageVehicleList';
import PersonPlaceVehicleList from '../../people-places/PersonPlaceVehicleList';
// types
import { IdName } from '../../../types/misc';
import { StageVehicleCount, PersonPlaceVehicleCount } from '../../../types/Stage';

// PeoplePlaceList
const useStyles = makeStyles(theme => ({
  list: {
    margin: 'auto',
    width: 'clamp(290px, 100%, 500px)',
  },
  accordianDetails: {
    padding: 0,
  },
  vehicleList: {
    width: '100%',
  },
}));

type Variant = 'peoplePlaces' | 'stages';
interface AccordianListProps {
  variant: Variant;
  accordianTitles: StageVehicleCount[] | PersonPlaceVehicleCount[];
};
export default function AccordianList(props: AccordianListProps): React.ReactElement {
  const classes = useStyles();
  const { variant, accordianTitles } = props;

  const determineTitleColor = (count: number, title: IdName) => {
    if (variant === 'peoplePlaces') {
      return title.name !== 'Small Town Auto Sales'
        ? count > 5
          ? 'secondary'
          : 'primary'
        : 'primary';
    } else if (variant === 'stages') {
      return title.name !== 'For Sale' ?
        count > 5 ? 'secondary'
          : 'primary'
        : 'primary';
    };
  };

  return (
    <div className={classes.list}>
      {accordianTitles.filter(title => title.count).map(title => {
        return (
          <div key={title.id}>
            <AccordionPaper>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color={determineTitleColor(title.count, title)}>
                  {title.name} ({title.count.toLocaleString()})
                </Typography>
              </AccordionSummary>
              {variant === 'stages'
                ? <StageVehicleList stageId={title.id} />
                : <PersonPlaceVehicleList personPlaceId={title.id} />}
            </AccordionPaper>
          </div>);
      })}
    </div >
  );
};
