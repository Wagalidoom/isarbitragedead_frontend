import './styles/globals.css';
import { themes } from './styles/theme/theme';
import Blocks from './components/Blocks';
import { CssBaseline, Grid, ThemeProvider, useMediaQuery } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SidePanel from './components/SidePanel';
import { useState } from 'react';
import Search from './components/Search';
import BlockDetails from './components/BlockDetails';
import About from './components/About';

export const LOCAL_IP_ADDRESS = process.env.REACT_APP_LOCAL_IP;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? themes.dark : themes.light;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchParams, setSearchParams] = useState<{ searchInput: string | null, profitMin: string | null, profitMax: string | null, isDollar: boolean }>({ searchInput: null, profitMin: null, profitMax: null, isDollar: true });
  const [currentBlockNumber, setCurrentBlockNumber] = useState<number>(0);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container columnSpacing={0} sx={{ width: '100%', height: '100%' }}>
          <Grid item xs={0} sm={3} md={3} sx={{ position: 'sticky', top: 0, height: '100vh', backgroundColor: theme.colors.backgroundSides, boxShadow: 3, zIndex: 1, display: isSmallScreen ? 'none' : 'block' }}>
            <SidePanel onSearchChange={setSearchParams} currentBlock={currentBlockNumber} />
          </Grid>
          <Grid item xs={12} sm={9} md={9} sx={{ backgroundColor: theme.colors.backgroundPrimary }}>
            <Routes>
              <Route path="/" element={(searchParams.searchInput || searchParams.profitMin || searchParams.profitMax) ? <Search searchParams={searchParams} /> : <Blocks setCurrentBlockNumber={setCurrentBlockNumber} />} />
              <Route path="/block/:blockNumber/opportunity/:opportunityIndex" element={<BlockDetails />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Grid>
        </Grid>
      </ThemeProvider>
    </BrowserRouter >
  );
}

export default App;
