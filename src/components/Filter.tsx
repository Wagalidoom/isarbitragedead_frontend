import { Box } from '@mui/material';
import React from 'react';


export interface IFilter {
}

const Filter: React.FC<IFilter> = () => {
  return (
    <>

      <Box paddingLeft={1} paddingTop={1} sx={{ position: 'absolute', display: 'flex' }}>Is arbitrage dead ?</Box>
    </>
  );
};

export default Filter;
