import './styles/globals.css';
import lightTheme from './styles/theme/lightTheme';
import Blocks from './components/Blocks';
import { Box, CssBaseline, Grid, ThemeProvider, useMediaQuery } from '@mui/material';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SidePanel from './components/SidePanel';
import { useState } from 'react';
import Search from './components/Search';
import BlockDetails from './components/BlockDetails';

import About from './components/About';
import { AwesomeButton } from 'react-awesome-button';
import { InfoOutlined } from '@mui/icons-material';
import "react-awesome-button/dist/styles.css";
import "./styles/theme/buttonTheme.css";



export const LOCAL_IP_ADDRESS = process.env.REACT_APP_LOCAL_IP;

function App() {
  const isSmallScreen = useMediaQuery(lightTheme.breakpoints.down('sm'));
  const [searchParams, setSearchParams] = useState<{ searchInput: string | null, profitMin: string | null, profitMax: string | null, isDollar: boolean }>({ searchInput: null, profitMin: null, profitMax: null, isDollar: true });
  const [currentBlockNumber, setCurrentBlockNumber] = useState<number>(0);

  return (
    <BrowserRouter>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Grid container columnSpacing={0} sx={{ width: '100%', height: '100%' }}>
          <Grid item xs={0} sm={3} md={3} sx={{ position: 'sticky', paddingTop: '20px', top: 0, height: '100vh', backgroundColor: '#f7f1e8', boxShadow: 3, zIndex: 1, display: isSmallScreen ? 'none' : 'block' }}>
            <Box sx={{ textAlign: 'center', fontSize: 'calc(10px + 2vmin)', color: '#454545' }}>
              <Link to="/" style={{ textDecoration: 'none', color: '#454545' }}>Is arbitrage dead ?</Link>
              <AwesomeButton className='infoButton' type="secondary" size="icon" onPress={() => window.location.href = "/about"} style={{ position: 'absolute', right: '20px', width: '40px', height: '40px' }}>
                <InfoOutlined />
              </AwesomeButton>
            </Box>
            <SidePanel onSearchChange={setSearchParams} currentBlock={currentBlockNumber} />
          </Grid>
          <Grid item xs={12} sm={9} md={9} sx={{ backgroundColor: '#eae6e1' }}>
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
