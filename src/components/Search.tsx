import React, { useEffect, useState } from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import Block from './Block';
import { LOCAL_IP_ADDRESS } from '../App';
import { BlockData } from './Blocks';
import CircularProgress from '@mui/material/CircularProgress';
import { useSearchParams } from 'react-router-dom';

export const generateSearchUrl = (baseUrl: string, searchInput: string | null, profitMin: string | null, profitMax: string | null, isDollar: boolean): string => {
  if (searchInput) {
    baseUrl += `&searchInput=${searchInput}`;
  }

  if (profitMin) {
    baseUrl += `&profitMin=${profitMin}`;
  }

  if (profitMax) {
    baseUrl += `&profitMax=${profitMax}`;
  }
  baseUrl += `&isDollar=${isDollar}`;

  return baseUrl;
};


const Search: React.FC = () => {
  const theme = useTheme();
  const [searchResults, setSearchResults] = useState<BlockData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const apiRequest = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(generateSearchUrl(`http://${LOCAL_IP_ADDRESS}:3001/api/search?`, searchParams.get('searchInput'), searchParams.get('profitMin'), searchParams.get('profitMax'), searchParams.get('isDollar') === 'true'));
      const data: BlockData[] = await response.json();
      console.log(data)
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    apiRequest();
  }, [searchParams]);

  return (
    <Grid container rowSpacing={5} sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.backgroundPrimary }}
    >
      {isLoading ? (
        <CircularProgress color="inherit" size={80} />
      ) : searchResults.length > 0 ? (
        searchResults.map(({ blockNumber, opportunities }, index) => (
          <Grid item xs={12} md={12} key={index}>
            <Block blockNumber={blockNumber} opportunities={opportunities} />
          </Grid>
        ))
      ) : (
        <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', color: theme.colors.announceText }}>
          No results
        </Typography>
      )}
    </Grid>
  );
};

export default Search;
