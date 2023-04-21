// src/components/BlockData.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const BlockData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io('http://localhost:3000');

    // Listen for the 'block-data' event
    socket.on('block-data', (receivedData) => {
      setData(receivedData);
    });

    // Clean up the socket connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h2>Block Data</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Waiting for data...</p>
      )}
    </div>
  );
};

export default BlockData;
