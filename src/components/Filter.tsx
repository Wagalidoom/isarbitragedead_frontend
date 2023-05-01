import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export interface IFilter {
  onSearchChange: (searchParams: {searchInput: string | null, profitMin: string | null, profitMax: string | null}) => void;
}

const Filter: React.FC<IFilter> = ({ onSearchChange }) => {
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [profitMin, setProfitMin] = useState<string | null>(null);
  const [profitMax, setProfitMax] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value !== '' ? event.target.value : null);
  };
  
  const handleProfitMinInput = (event: ChangeEvent<HTMLInputElement>) => {
    setProfitMin(event.target.value !== '' ? event.target.value : null);
  };
  
  const handleProfitMaxInput = (event: ChangeEvent<HTMLInputElement>) => {
    setProfitMax(event.target.value !== '' ? event.target.value : null);
  };
  

  const handleSearchSubmit = () => {
    if (searchInput || profitMin || profitMax) {
      onSearchChange({searchInput, profitMin, profitMax});
      setHasSearched(true);
    }
  };

  const handleClearSearch = () => {
    setSearchInput(null);
    setProfitMin(null);
    setProfitMax(null);
    onSearchChange({searchInput: null, profitMin: null, profitMax: null});
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
          value={searchInput || ''}
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
        value={profitMin || ''}
        onChange={handleProfitMinInput}
        onKeyPress={handleKeyPress}
        sx={{ marginTop: 1, '& input': { color: 'black' } }}
      />
       <TextField
        fullWidth
        id="outlined-profitMax"
        label="Profit Max"
        type="text"
        value={profitMax || ''}
        onChange={handleProfitMaxInput}
        onKeyPress={handleKeyPress}
        sx={{ marginTop: 1, '& input': { color: 'black' } }}
      />
      </Box>
    </>
  );
};

export default Filter;