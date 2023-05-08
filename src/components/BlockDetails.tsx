import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, TextField, Typography, colors } from '@mui/material';
import { useParams } from 'react-router-dom';
import { generateApiUrl } from './Search';
import { BlockData } from './Blocks';

interface Params {
  blockNumber: string;
  opportunityIndex: string;
}

interface BlockDetailsProps {
}

const BlockDetails: React.FC<BlockDetailsProps> = () => {
  const { blockNumber = '0', opportunityIndex = '0' } = useParams();
  const [searchResults, setSearchResults] = useState<BlockData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
      <Box sx={{ width: '80%', height: '80%', backgroundColor: '#ffffff', margin: 'auto', padding: 2 }}>
        {isLoading ? (
          <CircularProgress color="inherit" size={80} />
        ) : searchResults.length > 0 ? (
          searchResults.map(({ opportunities }, index) => (
            [<Typography sx={{color: 'gray'}} key={index}>{opportunities[Number(opportunityIndex)].tokenName}</Typography>]
          ))
        ) : (
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', color: 'gray', }}>
            No search results found
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default BlockDetails;