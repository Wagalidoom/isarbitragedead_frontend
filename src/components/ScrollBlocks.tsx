import { Box } from '@mui/material';
import React from 'react';

interface IScrollBlocks {
}

const ScrollBlocks: React.FC<IScrollBlocks> = () => {
  return (
    <>
      <Box sx={{height: '100%', width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
        <Box marginRight={3} sx={{ backgroundColor: '#ffffff', height: '100%', width: '3px', zIndex: 1, display: 'inline' }}></Box>
        <Box sx={{ backgroundColor: '#ffffff', height: '30px', width: '50px', zIndex: 2, display: 'inline' }}></Box>
      </Box >
    </>
  );
};

export default ScrollBlocks;