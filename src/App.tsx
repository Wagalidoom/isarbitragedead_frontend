import './styles/globals.css';
import { themes } from './styles/theme/theme';
import Blocks, { BlockData, fetchBlocksHistory } from './components/Blocks';
import { CssBaseline, Grid, ThemeProvider, useMediaQuery } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SidePanel from './components/SidePanel';
import { useEffect, useState } from 'react';
import Search from './components/Search';
import BlockDetails from './components/BlockDetails';
import About from './components/About';
import { Socket, io } from 'socket.io-client';

export const IS_PRODUCTION = process.env.REACT_APP_ENV === "production";
export const IP_ADDRESS = process.env.REACT_APP_IP;
export const API_PORT = process.env.REACT_APP_API_PORT;
export const SOCKET_PORT = process.env.REACT_APP_SOCKET_PORT;

async function getLastFetchedBlockNumber() {
  const lastBlock = await fetchBlocksHistory(1);
  return lastBlock[0].blockNumber;
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });
  const theme = isDarkMode ? themes.dark : themes.light;
  const toggleTheme = () => { setIsDarkMode(!isDarkMode); };
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [currentBlockNumber, setCurrentBlockNumber] = useState<number>(0);
  useEffect(() => {
    // Initial value for smoothness purposes
    getLastFetchedBlockNumber().then(setCurrentBlockNumber);
    
    // Connect to the Websocket server
    let socket: Socket;
    if (IS_PRODUCTION) {
      socket = io(`https://${IP_ADDRESS}:${SOCKET_PORT}`);
    } else {
      socket = io(`http://${IP_ADDRESS}:${SOCKET_PORT}`);
    }

    // Listen for the 'block-data' event
    socket.on('block-data', (receivedData: BlockData) => {
      setCurrentBlockNumber(receivedData.blockNumber);
    });

    // Clean up the socket connection when the component is unmounted or when isSearchActive changes
    return () => {
      socket.disconnect();
    };
  }, []);

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
              <Route path="/" element={<Blocks currentBlockNumber={currentBlockNumber} />} />
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
