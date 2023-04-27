import './App.css';
import './styles/globals.css';
import lightTheme from './styles/theme/lightTheme';
import Blocks from './components/Blocks';
import { Box, CssBaseline, Grid, ThemeProvider } from '@mui/material';
import Filter from './components/Filter';
import { useState } from 'react';
import Search from './components/Search';

export const LOCAL_IP_ADDRESS = process.env.REACT_APP_LOCAL_IP;

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Box paddingLeft={1} paddingTop={1} sx={{ position: 'fixed', top: 0, left: 0, zIndex: 1}}>Is arbitrage dead ?</Box>
        <Grid container columnSpacing={0} sx={{ height: '100%'}}>
          <Grid item xs={3} md={3} sx={{ backgroundColor: '#f7f1e8' }}>
            <Box sx={{ position: 'sticky', top: '50px' }}>
              <Filter onSearchChange={setSearchValue} />
            </Box>
          </Grid>
          <Grid item xs={9} md={9}>
            {searchValue ? <Search searchValue={searchValue} /> : <Blocks />}
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
