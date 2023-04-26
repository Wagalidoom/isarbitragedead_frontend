import { Box, TextField } from '@mui/material';
import React, { ChangeEvent } from 'react';


export interface IFilter {
  onSearchChange: (value: string) => void;
}

const Filter: React.FC<IFilter> = ({ onSearchChange }) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <>

      <Box paddingLeft={1} paddingTop={1} sx={{ position: 'absolute', display: 'flex' }}>Is arbitrage dead ?</Box>
      <Box paddingLeft={1} paddingTop={1} sx={{ position: 'absolute', display: 'flex' }}>
        <TextField
          id="search-input"
          label="Search"
          variant="outlined"
          onChange={handleSearchChange}
        />
      </Box>
    </>
  );
};

export default Filter;
