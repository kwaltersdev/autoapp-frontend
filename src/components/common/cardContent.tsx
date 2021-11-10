// material-ui
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// THIS PROJECT
// components
import { FlexCenter } from './flex';

export const LargeCard = styled(Card)(({
  theme
}) => ({
  width: 'clamp(300px, 98vw, 750px)',
  margin: 'auto',
  paddingBottom: theme.spacing(5),
  backgroundColor: 'white',
}));

export const SmallCard = styled(Card)(({
  theme
}) => ({
  width: 'clamp(300px, 98vw, 500px)',
  margin: 'auto',
  paddingBottom: theme.spacing(2),
  backgroundColor: 'white',
}));

export const ExtraSmallCard = styled(Card)(({
  theme
}) => ({
  width: 'clamp(200px, 50vw, 300px)',
  margin: 'auto',
  paddingBottom: theme.spacing(2),
  backgroundColor: 'white',
}));

export const ContentHeader = styled('div')(({
  theme
}) => ({
  padding: theme.spacing(1),
  width: '100%',
  textAlign: 'center',
}));

export const ContentTitle = styled(Typography)(({
  theme
}) => ({
  color: theme.titleColor.darkBlue,
}));

interface IconContentTitleProps {
  icon: JSX.Element;
  children: React.ReactChild | React.ReactChild[];
  variant?: 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline'
  | 'inherit';
};
export function IconContentTitle(props: IconContentTitleProps): React.ReactElement {
  return (
    <FlexCenter style={{ gap: 10 }}>
      {props.icon}
      <ContentTitle variant={props.variant}>{props.children}</ContentTitle>
    </FlexCenter>
  );
};

export const LargeContent = styled(CardContent)({
  width: 'clamp(300px, 98vw, 600px)',
  padding: 10,
  margin: '0px auto 0px auto',
  backgroundColor: 'white'
});

export const SmallContent = styled(CardContent)({
  width: 'clamp(300px, 98vw, 450px)',
  padding: 10,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

export const ContentPaper = styled(Paper)(({
  theme
}) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
}));