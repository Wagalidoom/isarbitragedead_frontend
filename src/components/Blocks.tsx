// components/BlockData.tsx
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


const Blocks: React.FC = () => {
  const [blockList, setDataList] = useState<BlockData[]>([]);

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io('http://localhost:3030');

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
    <div>
      <h2 className="page-title">Block Data</h2>
      <div className="parent-container">
        <div className="box-container">
          {blockList.length > 0 ? (
            blockList.map(({blockNumber, opportunities}, index) => <Block key={index} blockNumber={blockNumber} opportunities={opportunities} />)
          ) : (
            <p>Waiting for data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blocks;
