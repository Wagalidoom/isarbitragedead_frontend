import React, { useEffect, useState } from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import Block from './Block';
import { LOCAL_IP_ADDRESS } from '../App';
import { BlockData } from './Blocks';
import CircularProgress from '@mui/material/CircularProgress';

export const generateApiUrl = (searchInput: string | null, profitMin: string | null, profitMax: string | null, isDollar: boolean): string => {
  let baseApiUrl = `http://${LOCAL_IP_ADDRESS}:3001/api/search?`;

  if (searchInput) {
    baseApiUrl += `&searchInput=${searchInput}`;
  }

  if (profitMin) {
    baseApiUrl += `&profitMin=${profitMin}`;
  }

  if (profitMax) {
    baseApiUrl += `&profitMax=${profitMax}`;
  }
  baseApiUrl += `&isDollar=${isDollar}`;

  return baseApiUrl;
};


const Search: React.FC<{ searchParams: { searchInput: string | null, profitMin: string | null, profitMax: string | null, isDollar: boolean } }> = ({ searchParams }) => {
  const theme = useTheme();
  const [searchResults, setSearchResults] = useState<BlockData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiRequest = async ({ searchInput, profitMin, profitMax, isDollar }: { searchInput: string | null, profitMin: string | null, profitMax: string | null, isDollar: boolean }) => {
    setIsLoading(true);
    try {
      const response = await fetch(generateApiUrl(searchInput, profitMin, profitMax, isDollar));
      const data: BlockData[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    apiRequest(searchParams);
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
            {/* Passer null en ref ici ou autre chose ??? */}
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
