// @mui
import { createTheme } from '@mui/material/styles';
// common theme options
import commonThemeOptions from './commonThemeOptions';

const { components: commonComponentsOptions } = commonThemeOptions;

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF6347',
      light: '#FF826B',
      dark: '#B24531',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#2196F3',
      light: '#4DABF5',
      dark: '#1769AA',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#B2B2B2',
      contrastText: '#FF6347',
    },
    background: {
      default: '#DCD7C9',
      paper: '#fff',
    },
    text: {
      primary: '#ffffff',
      secondary: '#383838',
      disabled: '#777777',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          color: '#383838',
        },
      },
    },
    ...commonComponentsOptions,
  },
  typography: {
    fontFamily: [
      'Inconsolata',
      'Roboto',
      'sans-serif'
    ].join(','),
  },
});

export default lightTheme;
