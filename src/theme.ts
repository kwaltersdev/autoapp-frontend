import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles/createTheme' {
  interface Theme {
    mainMenu: {
      width: string;
    };
    titleColor: {
      lightBlue: string;
      darkBlue: string;
    };
  }
  interface ThemeOptions {
    mainMenu?: {
      width?: string;
    };
    titleColor?: {
      lightBlue?: string;
      darkBlue?: string;
    };
  }
};

export const theme = createTheme({
  mainMenu: {
    width: '250px',
  },
  titleColor: {
    lightBlue: '#aab6fe',
    darkBlue: '#49599a',
  },
});