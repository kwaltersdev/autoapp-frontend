export default function formatTimeText(milliseconds: number) {
  if (milliseconds < (1000 * 60)) {
    return `${Math.round(milliseconds / 1000)} secs`;
  } else if (milliseconds < (1000 * 60 * 60)) {
    return `${Math.round(milliseconds / (1000 * 60))} mins`;
  } else if (milliseconds < (1000 * 60 * 60 * 24)) {
    return `${Math.round(milliseconds / (1000 * 60 * 60))} hrs`;
  } else {
    // round days to one decimal point
    return `${Math.round(milliseconds / (1000 * 60 * 60 * 24) * 10) / 10} days`;
  };
}