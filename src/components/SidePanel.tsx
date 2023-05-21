import { Box, TextField, IconButton, InputAdornment, Typography, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import React, { ChangeEvent, useState, KeyboardEvent, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { API_PORT, IP_ADDRESS } from '../App';

import { AwesomeButton } from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";
import { Link, useNavigate } from 'react-router-dom';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { InfoOutlined } from '@mui/icons-material';
import { generateSearchUrl } from './Search';
export interface ISidePanel {
  currentBlock: number,
  isDarkMode: boolean,
  toggleTheme: () => void
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

const SidePanel: React.FC<ISidePanel> = ({ currentBlock, isDarkMode, toggleTheme }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
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
        const response = await fetch(`https://${IP_ADDRESS}:${API_PORT}/api/stats`);
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
      const searchUrl = generateSearchUrl('/search?', searchInput, profitMin, profitMax, isDollarProfitFilter);
      navigate(searchUrl);
      setHasSearched(true);
    }
  };

  const handleClearSearch = () => {
    setSearchInput(null);
    setProfitMin(null);
    setProfitMax(null);
    navigate('/');
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          padding: isSmallScreen ? 0 : 2,
          width: isSmallScreen ? 0 : "100%",
        }}
      >
        <Box>
          {/* Title and about Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', width: '100%', textAlign: 'center', fontSize: 'calc(10px + 2vmin)', marginBottom: '10px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: theme.palette.text.primary, fontSize: "1.8vw" }}>Is arbitrage dead ?</Link>
            <AwesomeButton className='infoButton' type="secondary" size="icon" onPress={toggleTheme} style={{ width: '40px', height: '40px', '--button-raise-level': '2px', '--button-secondary-color': theme.colors.backgroundSides, '--button-secondary-color-dark': theme.colors.buttonAccent, '--button-secondary-color-light': theme.colors.buttonAccent, '--button-secondary-color-hover': theme.colors.buttonHover, '--button-secondary-color-active': theme.colors.backgroundSides, '--button-secondary-border': `3px solid ${theme.colors.buttonAccent}` }}>
              {isDarkMode ? <WbSunnyIcon /> : <NightsStayIcon />}
            </AwesomeButton>
          </Box>
          {/* Searchbar */}
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            value={searchInput || ''}
            onChange={handleSearchInput}
            onKeyPress={handleKeyPress}
            sx={{ width: isSmallScreen ? 0 : '100%', '& input': { color: theme.palette.text.primary } }}
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
            <TextField id="outlined-profitMin" label="Profit Min" value={profitMin || ""} onChange={handleProfitMinInput} onKeyPress={handleKeyPress} sx={{ width: isSmallScreen ? 0 : "100%", "& input": { color: theme.palette.text.primary } }} />
            <IconButton onClick={toggleCurrencyFilter}>{isDollarProfitFilter ? "$" : "Ξ"}</IconButton>
            <TextField fullWidth id="outlined-profitMax" label="Profit Max" type="text" value={profitMax || ""} onChange={handleProfitMaxInput} onKeyPress={handleKeyPress} sx={{ marginLeft: 1, "& input": { color: theme.palette.text.primary } }} />
            <IconButton onClick={toggleCurrencyFilter}>{isDollarProfitFilter ? "$" : "Ξ"}</IconButton>
          </Box>
        </Box>
        {/* Statistics block */}
        <Box sx={{ color: theme.palette.text.secondary, display: "flex", flexDirection: "column", marginBottom: "15vh" }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isSmallScreen ? 0 : 4 }}>
            <FiberManualRecordIcon color="success" sx={{ marginRight: 1 }} />
            <Typography sx={{ fontSize: "1.5vw" }} >
              Block  <b>{currentBlock !== 0 ? currentBlock : '...'}</b>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", padding: 2 }}>
            <Typography component="div" sx={{ fontWeight: "bold", fontSize: "1.9vw" }}>
              Today
            </Typography>
          </Box>
          <Typography variant="body1" component="div" sx={{ padding: 1, fontSize: '1.2vw' }} >
            Total potential profit: <b>{isLoading ? <CircularProgress size={20} /> : `${apiData?.totalProfit.toFixed(2)} $`}</b>
          </Typography>
          <Typography variant="body1" component="div" sx={{ padding: 1, fontSize: '1.2vw' }}>
            Number of opportunities: <b>{isLoading ? <CircularProgress size={20} /> : apiData?.nbOpportunities}</b>
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Typography variant="body1" sx={{ padding: 1, fontSize: "1.2vw" }}>
              Most arbitraged token: <b>{isLoading ? <CircularProgress size={20} /> : apiData?.mostArbitragedToken.tokenName}</b>
              {apiData?.mostArbitragedToken.tokenLogo && (
                <Box sx={{ display: "inline", marginLeft: 1 }}>
                  <img src={apiData?.mostArbitragedToken.tokenLogo} alt="top-token-logo" width="20" height="20" />
                </Box>
              )}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', position: 'absolute', bottom: 0, left: 0, zIndex: 1, color: theme.palette.text.primary, width: '100%', padding: '5px', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography fontSize={'0.8vw'}>This website is for educational purposes only </Typography>
          <Typography fontSize={'0.8vw'}>By Lukas and Jordan</Typography>
        </Box>
        <Box>
          <IconButton className='infoButton' style={{ width: '40px', height: '40px' }}>
            <Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>
              <InfoOutlined />
            </Link>
          </IconButton>
        </Box>
      </Box>

    </>
  );
};

export default SidePanel;