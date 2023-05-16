import { Box, TextField, IconButton, InputAdornment, Typography, CircularProgress, useMediaQuery } from '@mui/material';
import React, { ChangeEvent, useState, KeyboardEvent, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { LOCAL_IP_ADDRESS } from '../App';
import lightTheme from '../styles/theme/lightTheme';
export interface ISidePanel {
  onSearchChange: (searchParams: { searchInput: string | null, profitMin: string | null, profitMax: string | null, isDollar: boolean }) => void,
  currentBlock: number
}

interface IArbStatistics {
  totalProfit: number,
  nbOpportunities: number,
  mostArbitragedToken: {
    tokenAddress: string,
    tokenName: string,
    tokenSymbol: string,
    tokenLogo: string,
  }
}

const SidePanel: React.FC<ISidePanel> = ({ onSearchChange, currentBlock }) => {
  const isSmallScreen = useMediaQuery(lightTheme.breakpoints.down('sm'));
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [profitMin, setProfitMin] = useState<string | null>(null);
  const [profitMax, setProfitMax] = useState<string | null>(null);
  const [isDollarProfitFilter, setIsDollarProfitFilter] = useState<boolean>(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [apiData, setApiData] = useState<IArbStatistics | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Appels à l'API pour avoir les stats des tokens
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://${LOCAL_IP_ADDRESS}:3001/api/stats`);
        const data = await response.json();
        setApiData({
          totalProfit: data.totalPotentialProfit,
          nbOpportunities: data.numberOfOpportunities,
          mostArbitragedToken: data.mostArbitragedToken
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
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

  const toggleCurrencyFilter = () => {
    setIsDollarProfitFilter(!isDollarProfitFilter);
  };


  const handleSearchSubmit = () => {
    if (searchInput || profitMin || profitMax) {
      onSearchChange({ searchInput, profitMin, profitMax, isDollar: isDollarProfitFilter });
      setHasSearched(true);
    }
  };

  const handleClearSearch = () => {
    setSearchInput(null);
    setProfitMin(null);
    setProfitMax(null);
    onSearchChange({ searchInput: null, profitMin: null, profitMax: null, isDollar: isDollarProfitFilter });
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
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: isSmallScreen ? 0 : 2,
          width:  isSmallScreen ? 0 : '100%',
        }}
      >
        {/* Searchbar */}
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={searchInput || ''}
          onChange={handleSearchInput}
          onKeyPress={handleKeyPress}
          sx={{ width:  isSmallScreen ? 0 : '100%', '& input': { color: 'black' } }}
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
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: 1 }}>
          <TextField

            id="outlined-profitMin"
            label="Profit Min"
            value={profitMin || ''}
            onChange={handleProfitMinInput}
            onKeyPress={handleKeyPress}
            sx={{ width:  isSmallScreen ? 0 : '100%', '& input': { color: 'black' } }}
          />
          <IconButton onClick={toggleCurrencyFilter}>
            {isDollarProfitFilter ? "$" : "Ξ"}
          </IconButton>
          <TextField
            fullWidth
            id="outlined-profitMax"
            label="Profit Max"
            type="text"
            value={profitMax || ''}
            onChange={handleProfitMaxInput}
            onKeyPress={handleKeyPress}
            sx={{ marginLeft: 1, '& input': { color: 'black' } }}
          />
          <IconButton onClick={toggleCurrencyFilter}>
            {isDollarProfitFilter ? "$" : "Ξ"}
          </IconButton>
        </Box>
        {/* Statistics block */}
        <Box
          sx={{
            display: 'flex',
            position: 'fixed',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'black',
            bottom: '15%',
            width: '100%',
          }}
        >
          <Box  sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, marginTop:4, padding: isSmallScreen ? 0 : 4 }}>
            <FiberManualRecordIcon color="success" sx={{ marginRight: 1 }} />
            <Typography sx={{fontSize: '30px'}} component="div" >
              Block  <b>{currentBlock !== 0 ? currentBlock : '...'}</b>
            </Typography>
          </Box>
          <Typography component="div" sx={{ fontWeight: 'bold', padding: 2, fontSize: '2vw' }}>
            Today
          </Typography>
          <Typography variant="body1" component="div" sx={{ padding: 1, fontSize: '1.35vw' }} >
            Total potential profit: <b>{isLoading ? <CircularProgress size={20} /> : `${apiData?.totalProfit.toFixed(2)} $`}</b>
          </Typography>
          <Typography variant="body1" component="div" sx={{ padding: 1, fontSize: '1.35vw' }}>
            Number of opportunities: <b>{isLoading ? <CircularProgress size={20} /> : apiData?.nbOpportunities}</b>
          </Typography>
          <Typography variant="body1" component="div" sx={{ padding: 1, fontSize: '1.35vw' }}>
            Most arbitraged token:
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <b>{isLoading ? <CircularProgress size={20} /> : apiData?.mostArbitragedToken.tokenName}</b>
                {apiData?.mostArbitragedToken.tokenLogo && (
                  <Box sx={{ marginLeft: 1 }}>
                    <img src={apiData?.mostArbitragedToken.tokenLogo} alt="top-token-logo" width="20" height="20" />
                  </Box>
                )}
              </Box>
            </Box>
          </Typography>




        </Box>
      </Box>
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, zIndex: 3 }}>
        <Typography variant='h5'>By Lukas and Jordan</Typography>
      </Box>
    </>
  );
};

export default SidePanel;