import './App.css';
import './styles/globals.css';
import lightTheme from './styles/theme/lightTheme';
import Blocks from './components/Blocks';
import Box from '@mui/material/Box';
import { CssBaseline, Grid, ThemeProvider } from '@mui/material';
import Filter from './components/Filter';

export const LOCAL_IP_ADDRESS = process.env.REACT_APP_LOCAL_IP;

function App() {
  return (

    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Box paddingLeft={1} paddingTop={1} sx={{ position: 'absolute', display: 'flex' }}>Is arbitrage dead ?</Box>
        <Grid container sx={{ height: '100%'}}>
          <Grid item xs={3} sx={{backgroundColor: '#f7f1e8'}}>
            <Filter />
          </Grid>
          <Grid item xs={9}sx={{backgroundColor: '#eae6e1'}}>
            <Blocks />
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
