import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { generateApiUrl } from './Search';
import { BlockData } from './Blocks';
import { OpportunityData } from './Block';
import styles from './../styles/BlockDetails.module.css';

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
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
        {isLoading ? (
          <CircularProgress color="inherit" size={80} />
        ) : opportunity ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '70%', height: '60%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div className={styles.logoInside}>
                <Typography variant="h6">EOA</Typography>
              </div>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div className={styles.arrowLeft}>
                <div className={styles.arrowLine}>
                  <Typography sx={{ color: '#454545', paddingTop: '45px', paddingLeft: '30px' }}>{opportunity.deltaYa} {opportunity.tokenSymbol}</Typography>
                </div>
              </div>
              <div className={styles.arrowRight}>
                <div className={styles.arrowLine}>
                  <Typography sx={{ color: '#454545', paddingTop: '45px', paddingLeft: '30px' }}>{opportunity.deltaYa} {opportunity.tokenSymbol}</Typography>
                </div>
              </div>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div className={styles.buyMarketOutside}>
                <div className={styles.logoInside}>
                  <img src={opportunity.sellMarketLogo} alt={opportunity.sellMarketName} width="40" height="40" />
                </div>
              </div>
              <div className={styles.arrowMarket}>
                <div className={styles.arrowLine}><Typography sx={{ color: '#454545', paddingTop: '45px', paddingLeft: '30px' }}>{opportunity.deltaYa} {opportunity.tokenSymbol}</Typography></div>
              </div>
              <div className={styles.sellMarketOutside}>
                <div className={styles.logoInside}>
                  <img src={opportunity.buyMarketLogo} alt={opportunity.buyMarketName} width="40" height="40" />
                </div>
              </div>
            </Box>
          </Box>
        ) : (
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', color: 'gray', }}>
            No search results found
          </Typography>
        )}
      </Box >
    </>
  );
};

export default BlockDetails;