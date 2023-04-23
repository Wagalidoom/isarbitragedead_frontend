import { Paper, Typography } from '@mui/material';
import React from 'react';
import { BlockData } from './Blocks';

const Block: React.FC<BlockData> = ({ blockNumber, opportunities }) => {
  console.log(opportunities);
  const content = opportunities.length === 0
    ? (<Typography variant="body1">No opportunities at this block</Typography>)
    : (opportunities.map((opportunity, index) =>  <Typography key={index} variant="body1">Profit: {opportunity.profit}</Typography>));
  return (
    <Paper sx={{ padding: 2, width: '60%', margin: '0 auto' }}>
      <Typography variant="h5"><b>Block: {blockNumber}</b></Typography>
      {content}
    </Paper>
  );
};

export default Block;
