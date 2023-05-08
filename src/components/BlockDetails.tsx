import React, { useEffect, useState } from 'react';
import { Avatar, Box, CircularProgress, Grid, Paper, TextField, Typography, colors, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import { generateApiUrl } from './Search';
import { BlockData } from './Blocks';
import { OpportunityData } from './Block';
import styles from './../styles/BlockDetails.module.css';

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
  const [opportunity, setOpportunity] = useState<OpportunityData>();

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

  useEffect(() => {
    if (searchResults.length > 0) {
      const currentBlock = searchResults[0];
      const opportunitiesArray = currentBlock.opportunities;
      const parsedOpportunityIndex = Number(opportunityIndex);

      if (opportunitiesArray && parsedOpportunityIndex >= 0 && parsedOpportunityIndex < opportunitiesArray.length) {
        setOpportunity(opportunitiesArray[parsedOpportunityIndex]);
      }
    }
  }, [searchResults, opportunityIndex]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6">External Owner Account</Typography>
          <Avatar src={opportunity?.baseLogo} alt={opportunity?.baseName ?? ''} />
          <Typography>{opportunity?.baseSymbol}</Typography>
        </Paper>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div className={`${styles.arrow} ${styles.arrowUp}`} />
          <Typography>{opportunity?.deltaXa} {opportunity?.baseSymbol}</Typography>
        </Box>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6">{opportunity?.buyMarketName}</Typography>
          <Avatar src={opportunity?.buyMarketLogo} alt={opportunity?.buyMarketName} />
          <Typography>{opportunity?.buyMarketAddress}</Typography>
        </Paper>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div className={`${styles.arrow} ${styles.arrowDown}`} />
          <Typography>{opportunity?.deltaYa} {opportunity?.tokenSymbol}</Typography>
        </Box>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography variant="h6">{opportunity?.sellMarketName}</Typography>
          <Avatar src={opportunity?.sellMarketLogo} alt={opportunity?.sellMarketName} />
          <Typography>{opportunity?.sellMarketAddress}</Typography>
        </Paper>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <div className={`${styles.arrow} ${styles.arrowUp}`} />
          <Typography>{opportunity?.deltaXb} {opportunity?.baseSymbol}</Typography>
        </Box>
      </Box>
      <Typography variant="h6">Profit</Typography>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Typography>{opportunity?.profitEth} ETH</Typography>
        <Typography>{opportunity?.profitDol} USD</Typography>
      </Box>
    </Box>
  );
};

export default BlockDetails;