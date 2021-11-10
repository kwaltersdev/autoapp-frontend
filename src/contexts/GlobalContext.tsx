// react
import { ReactChild, ReactChildren } from 'react';
// react-cookie
import { CookiesProvider } from 'react-cookie';
// material-ui
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
// THIS PROJECT
// contexts
import { AuthProvider } from './AuthContext';
import { DemoProvider } from './DemoContext';
// theme
import { theme } from '../theme';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme { }
}

interface GlobalContextProps {
  children: ReactChild | ReactChildren;
}
export default function GlobalContext(props: GlobalContextProps): React.ReactElement {
  return (
    <CookiesProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <DemoProvider>
            <AuthProvider>
              {props.children}
            </AuthProvider>
          </DemoProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </CookiesProvider>
  );
}