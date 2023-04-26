import { Container, Grid, Typography, Fade } from '@mui/material';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Block from './Block';
import { LOCAL_IP_ADDRESS } from '../App';

const INITIAL_DATA_TO_FETCH = 10;
const SCROLLING_DATA_TO_FETCH = 20;
const THROTTLE = 50;

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
  opportunities: OpportunityData[]
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
      if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.scrollHeight  - 100) return;
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
    <Container maxWidth={false}>
      <Grid container rowSpacing={5} sx={{ width: '100%',height: '100%'}}>
        {blockList.length > 0 ? (
          blockList.map(({ blockNumber, opportunities }, index) => (
            <Grid item xs={12} md={12} key={index}>
              {index === 0 ? (
                <Fade in={true} timeout={500} key={`fade-${blockNumber}`}>
                  <div>
                    <Block blockNumber={blockNumber} opportunities={opportunities} />
                  </div>
                </Fade>
              ) : (
                <Block blockNumber={blockNumber} opportunities={opportunities} />
              )}
            </Grid>
          ))
        ) : (
          <Grid item xs={12} md={12}>
            <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', color: 'gray', }} >
              No blocks to be shown
            </Typography>
            {/* <Block blockNumber={178896} opportunities={[]}></Block> */}
          </Grid>
        )}
      </Grid>
    </Container>
  );

};

export default Blocks;
