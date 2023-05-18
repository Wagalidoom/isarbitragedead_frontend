import './styles/globals.css';
import { themes } from './styles/theme/theme';
import Blocks from './components/Blocks';
import { CssBaseline, Grid, ThemeProvider, useMediaQuery } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SidePanel from './components/SidePanel';
import { useEffect, useState } from 'react';
import Search from './components/Search';
import BlockDetails from './components/BlockDetails';
import About from './components/About';

export const LOCAL_IP_ADDRESS = process.env.REACT_APP_LOCAL_IP;

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });
  const theme = isDarkMode ? themes.dark : themes.light;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentBlockNumber, setCurrentBlockNumber] = useState<number>(0);
  const toggleTheme = () => { setIsDarkMode(!isDarkMode); };

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid container columnSpacing={0} sx={{ width: '100%', height: '100%' }}>
          <Grid item xs={0} sm={3} md={3} sx={{ position: 'sticky', top: 0, height: '100vh', backgroundColor: theme.colors.backgroundSides, boxShadow: 3, zIndex: 1, display: isSmallScreen ? 'none' : 'block' }}>
            <SidePanel currentBlock={currentBlockNumber} isDarkMode={isDarkMode} toggleTheme={toggleTheme}/>
          </Grid>
          <Grid item xs={12} sm={9} md={9} sx={{ backgroundColor: theme.colors.backgroundPrimary }}>
            <Routes>
              <Route path="/" element={<Blocks setCurrentBlockNumber={setCurrentBlockNumber} />} />
              <Route path="/search" element={<Search />} />
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
