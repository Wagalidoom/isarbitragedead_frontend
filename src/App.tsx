import './styles/globals.css';
import lightTheme from './styles/theme/lightTheme';
import Blocks from './components/Blocks';
import { Box, CssBaseline, Grid, ThemeProvider } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Search from './components/Search';
import BlockDetails from './components/BlockDetails';
import SidePanel from './components/SidePanel';

export const LOCAL_IP_ADDRESS = process.env.REACT_APP_LOCAL_IP;

function App() {
  const [searchParams, setSearchParams] = useState<{ searchInput: string | null, profitMin: string | null, profitMax: string | null, isDollar: boolean }>({ searchInput: null, profitMin: null, profitMax: null, isDollar: true });
  const [currentBlockNumber, setCurrentBlockNumber] = useState<number>(0);

  return (
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Box paddingLeft={2} paddingTop={1} sx={{ position: 'fixed', top: 0, left: 0, zIndex: 2, fontSize: 'calc(10px + 2vmin)', color: '#454545' }}>Is arbitrage dead ?</Box>
        <Routes>
          <Route path="/" element={
            <Grid container columnSpacing={0} sx={{ height: '100%' }}>
              <Grid item xs={3} md={3} sx={{ backgroundColor: '#f7f1e8', boxShadow: 3, zIndex: 1 }}>
                <Box sx={{ position: 'sticky', top: '50px' }}>
                  <SidePanel onSearchChange={setSearchParams} currentBlock={currentBlockNumber} />
                </Box>

              </Grid>
              <Grid item xs={8} md={8}>
                {(searchParams.searchInput || searchParams.profitMin || searchParams.profitMax) ? <Search searchParams={searchParams} /> : <Blocks setCurrentBlockNumber={setCurrentBlockNumber} />}
              </Grid>
              <Grid item xs={1} md={1}>
                {/* <Minimap /> */}
              </Grid>
            </Grid>} />
          <Route path="/block/:blockNumber/opportunity/:opportunityIndex" element={<BlockDetails />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
