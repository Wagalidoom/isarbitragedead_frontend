import { Grid, Typography, Fade, Box } from '@mui/material';
import React, { useState, useEffect, useRef, Ref } from 'react';
import io from 'socket.io-client';
import Block from './Block';
import { LOCAL_IP_ADDRESS } from '../App';
import MinimapBlock from './Minimap';

const INITIAL_DATA_TO_FETCH = 10;
const SCROLLING_DATA_TO_FETCH = 20;
const THROTTLE = 40;

export interface OpportunityData {
  buyMarketAddress: string,
  sellMarketAddres: string,
  deltaXa: number,
  deltaYa: number,
  deltaXb: number,
  deltaYb: number,
  profit: number
}

export interface BlockData {
  blockNumber: number,
  opportunities: OpportunityData[],
  ref: Ref<HTMLDivElement>

}

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

const Blocks: React.FC = () => {
  const [lastDisplayedBlock, setCurrentBlockNumber] = useState(0);
  const [blockList, setBlockList] = useState<BlockData[]>([]);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleBlock, setVisibleBlock] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Le numéro de bloc est stocké dans l'attribut 'data-block-number' de chaque div de bloc
          const blockNumber = parseInt(entry.target.getAttribute('data-block-number') || '');
          setVisibleBlock(blockNumber);
          console.log(blockNumber);
        }
      });
    }, {
      rootMargin: '0px',
      threshold: 0.5, // Le bloc est considéré comme visible lorsqu'il est à moitié dans le viewport
    });

    blockRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      blockRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [blockList]);

  const handleMinimapClick = (index: number) => {
    const ref = blockRefs.current[index];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fetch the history asynchronously and update the state
  const fetchDataHistory = async (limit: number, fromBlock?: number) => {
    const history = await fetchBlocksHistory(limit, fromBlock);
    setBlockList((prevDataList) => [...prevDataList, ...history]);
    setCurrentBlockNumber(history[history.length - 1].blockNumber);
  };

  // Listening to scroll events and hot loading
  useEffect(() => {
    const throttle = (func: (...args: any[]) => any, delay: number): ((...args: any[]) => void) => {
      let lastCall = 0;
      return (...args: any[]) => {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func(...args);
      };
    };

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

  useEffect(() => {
    blockRefs.current = Array(blockList.length).fill(null);
  }, [blockList]);

  // When search is active, stop the connection
  useEffect(() => {
    // Connect to the Websocket server
    const socket = io(`http://${LOCAL_IP_ADDRESS}:3030`);

    // Listen for the 'block-data' event
    socket.on('block-data', (receivedData: BlockData) => {
      setBlockList((prevDataList) => [receivedData, ...prevDataList]);
    });

    // Clean up the socket connection when the component is unmounted or when isSearchActive changes
    return () => {
      socket.disconnect();
    };
  }, []);


  // On page loading : fetch history
  useEffect(() => {
    fetchDataHistory(INITIAL_DATA_TO_FETCH);
  }, []);

  return (
    <Grid container columnSpacing={0} sx={{ width: '100%', height: '100%' }}>
      <Grid item xs={11} md={11} sx={{ backgroundColor: '#eae6e1' }}>
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
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', color: 'gray', }} >
            No blocks to be shown
          </Typography>
        )}
      </Grid>
      <Grid item xs={1} md={1} sx={{ backgroundColor: '#f7f1e8', boxShadow: 3, display: 'flex', height: '100vh', position: 'sticky', top: '0', flexDirection: 'column' }}>
        {blockList.map(({ blockNumber }, index) => (
          <MinimapBlock key={index} blockNumber={blockNumber} onClick={() => handleMinimapClick(index)} isHighLighted={blockNumber === visibleBlock} />
        ))}
      </Grid>
    </Grid>
  );

};

export default Blocks;
