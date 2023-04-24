import { Container, Grid, Typography, Fade } from '@mui/material';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Block from './Block';

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
    const response = await fetch(`http://192.168.1.90:3001/api/blocks-history?${query}`);
    const data: BlockData[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching blocks history:', error);
    return [];
  }
}

const Blocks: React.FC = () => {
  const [blockList, setDataList] = useState<BlockData[]>([]);

  useEffect(() => {
    // Fetch the history asynchronously and update the state
    const fetchData = async () => {
      const history = await fetchBlocksHistory(20);
      setDataList(history);
    };

    // Initial fetch on page loading
    fetchData();

    // Connect to the WebSocket server
    const socket = io('http://192.168.1.90:3030');

    // Listen for the 'block-data' event
    socket.on('block-data', (receivedData: BlockData) => {
      setDataList((prevDataList) => [receivedData, ...prevDataList]);
    });

    // Clean up the socket connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 2 }}>Block Data</Typography>
      <Grid container spacing={2} sx={{ width: '100%' }}>
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
            <Typography
              variant="h3"
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'gray',
              }}
            >
              Waiting for data...
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );

};

export default Blocks;
