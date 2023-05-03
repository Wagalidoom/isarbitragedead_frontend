import { Box, TextField, IconButton, InputAdornment, Typography, CircularProgress } from '@mui/material';
import React, { ChangeEvent, useState, KeyboardEvent, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
export interface ISidePanel {
  onSearchChange: (searchParams: { searchInput: string | null, profitMin: string | null, profitMax: string | null }) => void,
  currentBlock: number
}

interface IArbStatistics {
  totalProfit: number,
  nbOpportunities: number,
  mostArbitragedToken: string
}

const Filter: React.FC<ISidePanel> = ({ onSearchChange, currentBlock }) => {
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [profitMin, setProfitMin] = useState<string | null>(null);
  const [profitMax, setProfitMax] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [apiData, setApiData] = useState<IArbStatistics>({
    totalProfit: 0,
    nbOpportunities: 0,
    mostArbitragedToken: ""
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate API calls to fetch data
  useEffect(() => {
    // Fetch block number and other data here
    // For now, we use dummy data with a delay of 5000ms (5 seconds)
    setTimeout(() => {
      setApiData({
        totalProfit: 12345.67,
        nbOpportunities: 100,
        mostArbitragedToken: 'ABC',
      });
      setIsLoading(false);
    }, 5000);
  }, []);


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
      onSearchChange({ searchInput, profitMin, profitMax });
      setHasSearched(true);
    }
  };

  const handleClearSearch = () => {
    setSearchInput(null);
    setProfitMin(null);
    setProfitMax(null);
    onSearchChange({ searchInput: null, profitMin: null, profitMax: null });
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 2,
          marginTop: 2,
          color: 'black',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <FiberManualRecordIcon color="success" />
          <Typography variant="h6" component="div">
            Block  {currentBlock !== 0 ? currentBlock : '...'}
          </Typography>
        </Box>
        <Typography variant="subtitle1" component="div">
          24h statistics
        </Typography>
        <Typography variant="body1" component="div">
          Total potential profit: {isLoading ? <CircularProgress size={20} /> : apiData.totalProfit}
        </Typography>
        <Typography variant="body1" component="div">
          Number of opportunities: {isLoading ? <CircularProgress size={20} /> : apiData.nbOpportunities}
        </Typography>
        <Typography variant="body1" component="div">
          Most arbitraged token: {isLoading ? <CircularProgress size={20} /> : apiData.mostArbitragedToken}
        </Typography>
      </Box>
    </>
  );
};

export default Filter;