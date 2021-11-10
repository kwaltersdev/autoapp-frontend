// material-ui
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
// THIS PROJECT
// components
import { FlexCenter } from '../common/flex';

interface CenteredErrorProps {
  errorMessage: string;
  retryAction?: () => void;
};
export default function CenteredError(props: CenteredErrorProps): React.ReactElement {
  const { errorMessage, retryAction } = props;

  return (
    <FlexCenter flexDirection='column'>
      <SentimentVeryDissatisfiedIcon />
      <p>{errorMessage}</p>
      <Divider />
      {retryAction
        && <Button onClick={retryAction}>
          Retry
        </Button>}
    </FlexCenter>
  );
}