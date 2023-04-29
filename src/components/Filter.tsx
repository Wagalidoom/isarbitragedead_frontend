import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export interface IFilter {
  onSearchChange: (searchParams: {searchInput: string, profitMin: number | null, profitMax: number | null}) => void;
}

const Filter: React.FC<IFilter> = ({ onSearchChange }) => {
  const [searchInput, setSearchInput] = useState('');
  const [profitMin, setProfitMin] = useState<number | null>(null);
  const [profitMax, setProfitMax] = useState<number | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleInputs = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchInput || profitMin || profitMax) {
      onSearchChange({searchInput, profitMin, profitMax});
      setHasSearched(true);
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setProfitMin(null);
    setProfitMax(null);
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
          onChange={handleInputs}
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
        value={profitMin || ''}
        onChange={(e) =>
          setProfitMin(e.target.value ? Number(e.target.value) : null)
        }
        onKeyPress={handleKeyPress}
        sx={{ marginTop: 1, '& input': { color: 'black' } }}
      />
       <TextField
        fullWidth
        id="outlined-profitMax"
        label="Profit Max"
        type="number"
        value={profitMax || ''}
        onChange={(e) =>
          setProfitMax(e.target.value ? Number(e.target.value) : null)
        }
        onKeyPress={handleKeyPress}
        sx={{ marginTop: 1, '& input': { color: 'black' } }}
      />
      </Box>
    </>
  );
};

export default Filter;
