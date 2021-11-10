// THIS PROJECT
import { LargeCard, LargeContent, ContentHeader, ContentTitle } from '../common/cardContent';
import CenteredError from '../common/CenteredError';

interface VehicleFailedProps {
  errorMessage?: string;
  retryAction?: () => void;
};
export default function VehicleFailed(props: VehicleFailedProps): React.ReactElement {
  const { errorMessage: errorMessagetmp, retryAction } = props;
  const errorMessage = errorMessagetmp
    ? errorMessagetmp
    : 'failed to load vehicle details';

  return (
    <LargeCard>
      <LargeContent>
        <ContentHeader>
          <ContentTitle variant='h5'>Vehicle Details:</ContentTitle>
        </ContentHeader>
        <CenteredError errorMessage={errorMessage} retryAction={retryAction} />
      </LargeContent>
    </LargeCard>
  );
}