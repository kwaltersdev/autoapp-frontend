// react
import { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Collapse from '@mui/material/Collapse';

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(2),
  },
}));

interface DetailsButtonProps {
  children: React.ReactChild | React.ReactChild[];
};
export default function DetailsButton(props: DetailsButtonProps): React.ReactElement {
  const classes = useStyles();
  const { children } = props;
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const toggleShowDetails = () => {
    showDetails && setShowDetails(false);
    !showDetails && setShowDetails(true);
  };

  return (
    <>
      <Button
        startIcon={!showDetails ? <AddIcon /> : <RemoveIcon />}
        onClick={toggleShowDetails}
        size='large'
        className={classes.button}
      >
        Details
      </Button>
      <Collapse in={showDetails} timeout='auto' style={{ width: '100%' }}>
        {children}
      </Collapse>
    </>
  );
}