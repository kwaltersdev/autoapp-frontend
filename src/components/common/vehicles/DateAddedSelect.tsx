// THIS PROJECT
import DateRangeSelect from '../DateRangeSelect';
// components
import { Set } from '../../../types/misc';

interface DateAddedSelectProps {
  after: number | null;
  setAfter: Set<number | null>;
  before: number | null;
  setBefore: Set<number | null>;
  className?: string;
}
export default function DateAddedSelect(props: DateAddedSelectProps): React.ReactElement {
  const { after, setAfter, before, setBefore, className } = props;

  const afterDate = after && new Date(after).toLocaleDateString();
  const beforeDate = before && new Date(before).toLocaleDateString();

  const buttonLabel = (after && before)
    ? `Added: ${afterDate} to ${beforeDate}`
    : after
      ? `Added: after ${afterDate}`
      : before
        ? `Added: before ${beforeDate}`
        : 'Date Added';

  return (
    <DateRangeSelect
      buttonLabel={buttonLabel}
      dialogTitle='Select Date Added Range'
      after={after}
      setAfter={setAfter}
      before={before}
      setBefore={setBefore}
      className={className}
    />
  );
}