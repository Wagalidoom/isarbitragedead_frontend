import React from 'react';
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

interface BlockDetailsProps {
}

const BlockDetails: React.FC<BlockDetailsProps> = () => {
  const { blockNumber, opportunityIndex } = useParams();
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
      <Box sx={{ width: '80%', height: '80%', backgroundColor: '#ffffff', margin: 'auto', padding: 2 }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>Block Details</Typography>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>Block Number: {blockNumber}</Typography>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>Opportunities: {opportunityIndex} </Typography>
      </Box>
    </Box>
  );
};

export default BlockDetails;