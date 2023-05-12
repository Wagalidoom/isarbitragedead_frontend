import { Grid, Typography, Fade, Box, Fab, useMediaQuery } from '@mui/material';
import React, { useState, useEffect, useRef, Ref } from 'react';
import io from 'socket.io-client';
import Block, { OpportunityData } from './Block';
import { LOCAL_IP_ADDRESS } from '../App';
import { ArrowUpward } from '@mui/icons-material';
import lightTheme from '../styles/theme/lightTheme';
import MiniBlock, { MINIBLOCK_VERTICAL_PADDING } from './MiniBlock';

// Constantes globales
const INITIAL_DATA_TO_FETCH = 20;
const SCROLLING_DATA_TO_FETCH = 50;
const PX_HOT_LOADING_LIMIT = 100;
const THROTTLE = 20;

export interface BlockData {
  blockNumber: number,
  opportunities: OpportunityData[]
}

interface IBlocks {
  setCurrentBlockNumber: (blockNumber: number) => void;
}

// Récupère l'historique des blocs à partir de l'API
async function fetchBlocksHistory(limit: number, fromBlockNumber?: number): Promise<BlockData[]> {
  try {
    const query = fromBlockNumber === undefined ? `limit=${limit}` : `fromBlockNumber=${fromBlockNumber}&limit=${limit}`
    const response = await fetch(`http://${LOCAL_IP_ADDRESS}:3001/api/blocks-history?${query}`);
    const data: BlockData[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blocks history:', error);
    return [];
  }
}

// Génère une fonction qui retarde l'exécution de la fonction passée en argument
const throttle = (func: (...args: any[]) => any, delay: number): ((...args: any[]) => void) => {
  let lastCall = 0;
  return (...args: any[]) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func(...args);
  };
};

const Blocks: React.FC<IBlocks> = ({ setCurrentBlockNumber }) => {
  // État local et références
  const [lastDisplayedBlock, setLastDisplayedBlock] = useState(0);
  const [blockList, setBlockList] = useState<BlockData[]>([]);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const blocksScrollRef = useRef<HTMLDivElement | null>(null);
  const miniBlocksScrollRef = useRef<HTMLDivElement | null>(null);




  // Récupère l'historique des données de manière asynchrone et met à jour l'état
  const fetchDataHistory = async (limit: number, fromBlock?: number) => {
    const history = await fetchBlocksHistory(limit, fromBlock);
    setBlockList((prevDataList) => [...prevDataList, ...history]);
    setLastDisplayedBlock(history[history.length - 1].blockNumber);
  
    // Récupère le premier block de l'historique
    return history[0].blockNumber;
  };
  

  // Listening to scroll events and hot loading
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (!blocksScrollRef.current) return;
      // Check if the user has scrolled to the near bottom of the page
      const { scrollTop, scrollHeight, clientHeight } = blocksScrollRef.current;
      if (scrollTop + clientHeight >= scrollHeight - PX_HOT_LOADING_LIMIT) {
        fetchDataHistory(SCROLLING_DATA_TO_FETCH, lastDisplayedBlock);
      }
    }, THROTTLE);

    // Add the 'handleScroll' function as an event listener for the 'scroll' event on the window object only when search is not active
    const scrollElement = blocksScrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }

    // Return a cleanup function that removes the event listener when the component is unmounted or when the dependencies change
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
    // The effect depends on 'lastDisplayedBlock', so it will run whenever 'lastDisplayedBlock' changes
  }, [lastDisplayedBlock]);

  // Met à jour les références des blocs lorsque la liste des blocs change
  useEffect(() => {
    blockRefs.current = Array(blockList.length).fill(null);
  }, [blockList]);

  // Établit la connexion WebSocket
  useEffect(() => {
    // Connect to the Websocket server
    const socket = io(`http://${LOCAL_IP_ADDRESS}:3030`);

    // Listen for the 'block-data' event
    socket.on('block-data', (receivedData: BlockData) => {
      setBlockList((prevDataList) => [receivedData, ...prevDataList]);
      setCurrentBlockNumber(receivedData.blockNumber);
    });

    // Clean up the socket connection when the component is unmounted or when isSearchActive changes
    return () => {
      socket.disconnect();
    };
  }, []);


  // Récupère l'historique lors du chargement de la page
  useEffect(() => {
    const fetchInitialData = async () => {
      const initialBlockNumber = await fetchDataHistory(INITIAL_DATA_TO_FETCH);
      setCurrentBlockNumber(initialBlockNumber);
    };
    fetchInitialData();
  }, [setCurrentBlockNumber]);

  // Fonction pour remonter en un clic 
  const scrollToTop = () => {
    if (blocksScrollRef.current && miniBlocksScrollRef.current) {
      blocksScrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };


  // Fonctions pour le fonctionnement de la minimap
  const handleBlocksScroll = () => {
    if (blocksScrollRef.current && miniBlocksScrollRef.current) {
      const blocksScrollHeight = blocksScrollRef.current.scrollHeight - blocksScrollRef.current.offsetHeight;
      const miniBlocksScrollHeight = miniBlocksScrollRef.current.scrollHeight - miniBlocksScrollRef.current.offsetHeight;
      const scrollRatio = miniBlocksScrollHeight / blocksScrollHeight;
      miniBlocksScrollRef.current.scrollTop = blocksScrollRef.current.scrollTop * scrollRatio;
      updateViewportFrame()
    }
  };

  const handleMinimapScroll = (event: React.WheelEvent) => {
    event.preventDefault();
    if (blocksScrollRef.current) {
      blocksScrollRef.current.scrollTop += event.deltaY;
    }
  };

  // Viewport 
  const updateViewportFrame = () => {
    const blocksScrollElement = blocksScrollRef.current;
    const miniBlocksScrollElement = miniBlocksScrollRef.current;
    const viewportElement = document.getElementById("viewport");
  
    if (blocksScrollElement && miniBlocksScrollElement && viewportElement) {
      // Calculate the total height of all MiniBlock elements
      const totalMiniBlocksHeight = miniBlocksScrollElement.scrollHeight;
      
      const VISIBLE_MINIBLOCKS = 28;
      
      // Calculate the height of the viewport frame based on VISIBLE_BLOCKS
      const viewportHeight = (4/VISIBLE_MINIBLOCKS) * window.innerHeight;
      const viewportTop = blocksScrollElement.scrollTop * (blocksScrollElement.clientHeight / blocksScrollElement.scrollHeight) - viewportHeight;
      viewportElement.style.height = `${viewportHeight}px`;
      viewportElement.style.top = `${viewportTop}px`;
    }
  };

  return (
    <Grid container columnSpacing={0} sx={{ width: '100%' }} >
      <Grid item xs={12} sm={11} md={11} >
        <div ref={blocksScrollRef} onScroll={handleBlocksScroll} style={{ height: '100vh', overflowY: 'scroll' }}>
          {blockList.length > 0 ? (
            blockList.map(({ blockNumber, opportunities }, index) => (
              <Box sx={{ marginTop: '50px' }} key={index}>
                {index === 0 ? (
                  <Fade in={true} timeout={500} key={`fade-${blockNumber}`}>
                    <div>
                      <Block blockNumber={blockNumber} opportunities={opportunities} />
                    </div>
                  </Fade>
                ) : (
                  <Block blockNumber={blockNumber} opportunities={opportunities} />
                )}
              </Box>
            )
            )
          ) : (
            <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'gray', textAlign: 'center' }} >
              No blocks to be shown
            </Typography>
          )}
        </div>
      </Grid>

      {/* Minimap */}
      <Grid item xs={0} sm={1} md={1}  >
        <div ref={miniBlocksScrollRef} onWheel={handleMinimapScroll} style={{ height: '100vh', overflowY: 'scroll' }}>
        <div id="viewport" style={{ position: 'absolute', border: '2px solid #FF5252', zIndex: 1 }}></div>
          {blockList.length > 0 ? (
            blockList.map(({ opportunities }, index) => (
              <MiniBlock nbOpportunities={opportunities.length} key={index} />
            )
            )
          ) : (
            <Typography />
          )}
        </div>
      </Grid>

      <Box sx={{ position: 'fixed', top: 16, right: 150, zIndex: 1 }}>
        <Fab color="secondary" onClick={scrollToTop}>
          <ArrowUpward />
        </Fab>
      </Box>
    </Grid>
  );

};

export default Blocks;