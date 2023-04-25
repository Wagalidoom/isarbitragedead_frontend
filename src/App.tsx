import './App.css';
import './styles/globals.css';
import lightTheme from './styles/theme/lightTheme';
import Blocks from './components/Blocks';
import Box from '@mui/material/Box';
import { CssBaseline, ThemeProvider } from '@mui/material';

function App() {
  return (
    
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Box paddingLeft={1} paddingTop={1} sx={{ display: 'flex' }}>Is arbitrage dead ?</Box>
        <Box marginTop={10}>
          <Blocks />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
