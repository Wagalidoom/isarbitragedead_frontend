import { Grid, Typography, Fade, Box, Fab } from '@mui/material';
import React, { useState, useEffect, useRef, Ref } from 'react';
import io from 'socket.io-client';
import Block, { OpportunityData } from './Block';
import { LOCAL_IP_ADDRESS } from '../App';
import { ArrowUpward } from '@mui/icons-material';

// Constantes globales
const MINIBLOCKS = Math.floor(window.innerHeight / 15);
const INITIAL_DATA_TO_FETCH = MINIBLOCKS * 3;
const SCROLLING_DATA_TO_FETCH = 50;
const THROTTLE = 20;

export interface BlockData {
  blockNumber: number,
  opportunities: OpportunityData[],
  ref: Ref<HTMLDivElement>

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
      // Check if the user has scrolled to the near bottom of the page
      if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.scrollHeight - 100) return;
      fetchDataHistory(SCROLLING_DATA_TO_FETCH, lastDisplayedBlock);
    }, THROTTLE);

    // Add the 'handleScroll' function as an event listener for the 'scroll' event on the window object only when search is not active
    window.addEventListener('scroll', handleScroll);

    // Return a cleanup function that removes the event listener when the component is unmounted or when the dependencies change
    return () => {
      window.removeEventListener('scroll', handleScroll);
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
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  };

  return (
    
    <Grid container columnSpacing={0} sx={{ width: '100%', height: '100%' }} >
      <Grid item xs={12} md={12} sx={{ backgroundColor: '#eae6e1' }}>
        {blockList.length > 0 ? (
          blockList.map(({ blockNumber, opportunities }, index) => (
            <Box sx={{ marginTop: '50px' }} key={index}>
              {index === 0 ? (
                <Fade in={true} timeout={500} key={`fade-${blockNumber}`}>
                  <div>
                    <Block ref={el => blockRefs.current[index] = el} blockNumber={blockNumber} opportunities={opportunities} />
                  </div>
                </Fade>
              ) : (
                <Block ref={el => blockRefs.current[index] = el} blockNumber={blockNumber} opportunities={opportunities} />
              )}
            </Box>
          )
          )
        ) : (
          // <Block blockNumber={157896} opportunities={[]} />
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', color: 'gray' }} >
            No blocks to be shown
          </Typography>
        )}
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