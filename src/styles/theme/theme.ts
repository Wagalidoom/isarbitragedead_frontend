import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    colors: {
      backgroundPrimary: string;
      backgroundSides: string;
      blockColor: string;
      accentuation: string;
      textOnBlock: string;
      announceText: string;
      buttonHover: string;
      buttonAccent: string;
    };
  }

  interface ThemeOptions {
    colors?: {
      backgroundPrimary: string;
      backgroundSides: string;
      blockColor: string;
      accentuation: string;
      textOnBlock: string;
      announceText: string;
      buttonHover: string;
      buttonAccent: string;
    };
  }
}

const themes = {
  light: createTheme({
    palette: {
      mode: 'light',
      text: { primary: '#454545', secondary: '#000' },
    },
    colors: {
      backgroundPrimary: '#eae6e1',
      backgroundSides: '#f7f1e8',
      blockColor: '#6389be',
      accentuation: '#faf7f2',
      textOnBlock: '#eae6e1',
      announceText: 'gray',
      buttonHover: '#dccdbf',
      buttonAccent: '#333232',
    },
    typography: {
      fontFamily: [
        'Inconsolata',
        'Roboto',
        'sans-serif'
      ].join(','),
    },
  }),
  dark: createTheme({
    palette: {
      mode: 'dark',
      text: { primary: '#fff' },
    },
    colors: {
      backgroundPrimary: '#ff5722',
      backgroundSides: '#4caf50',
      blockColor: '#2196f3',
      accentuation: '#9c27b0',
      textOnBlock: '#eae6e1',
      announceText: 'gray',
      buttonHover: '#dccdbf',
      buttonAccent: '#333232',
    },
    typography: {
      fontFamily: [
        'Inconsolata',
        'Roboto',
        'sans-serif'
      ].join(','),
    },
  }),
};

export { themes };
