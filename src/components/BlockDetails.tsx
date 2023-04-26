import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { BlockData } from './Blocks';

interface BlockDetailsProps {
  block: BlockData;
  onClose: () => void;
}

const BlockDetails: React.FC<BlockDetailsProps> = ({ block, onClose }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }} onClick={onClose}>
      <Box sx={{ width: '80%', height: '80%', backgroundColor: '#ffffff', margin: 'auto', padding: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>Block Details</Typography>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>Block Number: {block.blockNumber}</Typography>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>Opportunities:</Typography>
        {block.opportunities.map((opportunity, index) => (
          <Typography key={index} variant="body1" sx={{ marginBottom: 1 }}>{JSON.stringify(opportunity)}</Typography>
        ))}
      </Box>
    </Box>
  );
};

export default BlockDetails;