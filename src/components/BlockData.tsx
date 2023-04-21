// components/BlockData.tsx
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Block from './Block';

export interface OpportunityData {
  blockNumber: number,
  buyMarketAddress: string,
  sellMarketAddres: string,
  deltaXa: number,
  deltaYa: number,
  deltaXb: number,
  deltaYb: number,
  profit: number
}

const BlockData: React.FC = () => {
  const [dataList, setDataList] = useState<OpportunityData[]>([]);

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io('http://localhost:3030');

    // Listen for the 'block-data' event
    socket.on('block-data', (receivedData: OpportunityData) => {
      setDataList((prevDataList) => [receivedData, ...prevDataList]);
    });

    // Clean up the socket connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Block Data</h2>
      {dataList.length > 0 ? (
        dataList.map((data, index) => <Block key={index} data={data} />)
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
  );
};

export default BlockData;
