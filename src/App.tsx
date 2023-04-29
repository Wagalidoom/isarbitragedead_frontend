import './App.css';
import './styles/globals.css';
import lightTheme from './styles/theme/lightTheme';
import Blocks from './components/Blocks';
import { Box, CssBaseline, Grid, ThemeProvider, Typography } from '@mui/material';
import Filter from './components/Filter';
import { useState } from 'react';
import Search from './components/Search';

export const LOCAL_IP_ADDRESS = process.env.REACT_APP_LOCAL_IP;

function App() {
  const [searchParams, setSearchParams] = useState<{searchInput: string | null, profitMin: number | null, profitMax: number | null}>({searchInput: null, profitMin: null, profitMax: null});

  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Box paddingLeft={2} paddingTop={1} sx={{ position: 'fixed', top: 0, left: 0, zIndex: 2 }}>Is arbitrage dead ?</Box>
        <Grid container columnSpacing={0} sx={{ height: '100%' }}>
          <Grid item xs={3} md={3} sx={{ backgroundColor: '#f7f1e8', boxShadow: 3, zIndex: 1 }}>
            <Box sx={{ position: 'sticky', top: '50px' }}>
            <Filter onSearchChange={setSearchParams} />
            </Box>
            <Box sx={{ position: 'fixed', bottom: 0, left: 0, zIndex: 3 }}>
              <Typography variant='h5'>By Lukas and Jordan</Typography>
            </Box>
          </Grid>
          <Grid item xs={9} md={9}>
          {searchParams.searchInput ? <Search searchParams={searchParams} /> : <Blocks />}
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}

export default App;
