import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export interface IFilter {
  onSearchChange: (searchParams: {searchInput: string | null, profitMin: number | null, profitMax: number | null}) => void;
}

const Filter: React.FC<IFilter> = ({ onSearchChange }) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [profitMin, setProfitMin] = useState<number>(0);
  const [profitMax, setProfitMax] = useState<number>(1000000000);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value !== '' ? event.target.value : '');
  };
  
  const handleProfitMinInput = (event: ChangeEvent<HTMLInputElement>) => {
    setProfitMin(event.target.value !== '' ? parseFloat(event.target.value) : 0)
  };
  
  const handleProfitMaxInput = (event: ChangeEvent<HTMLInputElement>) => {
    setProfitMax(event.target.value !== '' ? parseFloat(event.target.value) : 1000000000);
  };
  

  const handleSearchSubmit = () => {
    if (searchInput || profitMin || profitMax) {
      onSearchChange({searchInput, profitMin, profitMax});
      setHasSearched(true);
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setProfitMin(0);
    setProfitMax(1000000000);
    onSearchChange({searchInput: '', profitMin: null, profitMax: null});
    setHasSearched(false);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
        }}
      >
        {/* Searchbar */}
        <TextField
          fullWidth
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={searchInput}
          onChange={handleSearchInput}
          onKeyPress={handleKeyPress}
          sx={{ '& input': { color: 'black' } }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {hasSearched ? (
                  <IconButton edge="end" onClick={handleClearSearch}>
                    <ClearIcon />
                  </IconButton>
                ) : (
                  <IconButton edge="end" onClick={handleSearchSubmit}>
                    <SearchIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
        {/* Profit filters */}
        <TextField
        fullWidth
        id="outlined-profitMin"
        label="Profit Min"
        type="number"
        value={profitMin}
        onChange={handleProfitMinInput}
        onKeyPress={handleKeyPress}
        sx={{ marginTop: 1, '& input': { color: 'black' } }}
      />
       <TextField
        fullWidth
        id="outlined-profitMax"
        label="Profit Max"
        type="number"
        value={profitMax}
        onChange={handleProfitMaxInput}
        onKeyPress={handleKeyPress}
        sx={{ marginTop: 1, '& input': { color: 'black' } }}
      />
      </Box>
    </>
  );
};

export default Filter;
