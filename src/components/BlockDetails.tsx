import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, TextField, Typography, colors, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import { generateApiUrl } from './Search';
import { BlockData } from './Blocks';
import SidePanel from './SidePanel';
import lightTheme from '../styles/theme/lightTheme';

interface Params {
  blockNumber: string;
  opportunityIndex: string;
}

interface BlockDetailsProps {
}

const BlockDetails: React.FC<BlockDetailsProps> = () => {
  const isSmallScreen = useMediaQuery(lightTheme.breakpoints.down('sm'));
  const { blockNumber = '0', opportunityIndex = '0' } = useParams();
  const [searchResults, setSearchResults] = useState<BlockData[]>([]);
  const [searchParams, setSearchParams] = useState<{ searchInput: string | null, profitMin: string | null, profitMax: string | null, isDollar: boolean }>({ searchInput: null, profitMin: null, profitMax: null, isDollar: true });
  const [isLoading, setIsLoading] = useState(false);
  const [currentBlockNumber, setCurrentBlockNumber] = useState<number>(0);

  const apiRequest = async ({ searchInput }: { searchInput: string }) => {
    setIsLoading(true);
    try {
      const response = await fetch(generateApiUrl(searchInput, null, null, true));
      const data: BlockData[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    apiRequest({ searchInput: blockNumber });
  }, [blockNumber]);
  return (
    <>
      <Box sx={{ width: '80%', height: '80%', backgroundColor: '#ffffff', margin: 'auto', padding: 2 }}>
        {isLoading ? (
          <CircularProgress color="inherit" size={80} />
        ) : searchResults.length > 0 ? (
          searchResults.map(({ opportunities }, index) => (
            [<Typography sx={{ color: 'gray' }} key={index}>{opportunities[Number(opportunityIndex)].tokenName}</Typography>]
          ))
        ) : (
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', color: 'gray', }}>
            No search results found
          </Typography>
        )}
      </Box>
    </>
  );
};

export default BlockDetails;