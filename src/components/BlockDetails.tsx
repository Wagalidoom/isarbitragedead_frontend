import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { generateApiUrl } from './Search';
import { BlockData } from './Blocks';
import { OpportunityData } from './Block';
import styles from './../styles/BlockDetails.module.css';
import ReactFlow, { Position } from 'reactflow';

import 'reactflow/dist/style.css';
import './overview.css';

interface BlockDetailsProps {
}


const BlockDetails: React.FC<BlockDetailsProps> = () => {
  const { blockNumber = '0', opportunityIndex = '0' } = useParams();
  const [searchResults, setSearchResults] = useState<BlockData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [opportunity, setOpportunity] = useState<OpportunityData>();
  const [initialNodes, setInitialNodes] = useState<any[]>([]);
  const [initialEdges, setInitialEdges] = useState<any[]>([]);

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

  useEffect(() => {
    if (opportunity) {
      setInitialNodes([
        {
          id: '1', position: { x: 300, y: 0 }, data: {
            label:
              <Typography variant="h6">EOA</Typography>
          }, sourcePosition: Position.Left,
          targetPosition: Position.Right,
          draggable: false,
          className: 'logoInside',
        },
        {
          id: '2', position: { x: 0, y: 300 }, data: {
            label:
              <div className={styles.logoInside}>
                <img src={opportunity.buyMarketLogo} alt={opportunity.buyMarketName} width="40" height="40" />
              </div>
          }, sourcePosition: Position.Right,
          draggable: false,
          className: 'buyMarket',
        },
        {
          id: '3', position: { x: 600, y: 300 }, data: {
            label:
              <div className={styles.logoInside}>
                <img src={opportunity.sellMarketLogo} alt={opportunity.sellMarketName} width="40" height="40" />
              </div>
          }, sourcePosition: Position.Top,
          targetPosition: Position.Left,
          draggable: false,
          className: 'sellMarket',
        },
      ]);
    }
  }, [opportunity]);  // When opportunity changes, this will run

  useEffect(() => {
    if (opportunity) {
      setInitialEdges([
        { id: 'e1-2', source: '1', target: '2', type: 'step', animated: true, label: opportunity.deltaYa+" "+opportunity.baseSymbol },
        { id: 'e2-3', source: '2', target: '3', type: 'step', animated: true, label: opportunity.deltaXa+" "+opportunity.tokenSymbol},
        { id: 'e3-1', source: '3', target: '1', type: 'step', animated: true, label: opportunity.deltaYb+" "+opportunity.baseSymbol}
      ]
      );
    }
  }, [opportunity]);  // When opportunity changes, this will run

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}>
        {isLoading ? (
          <CircularProgress color="inherit" size={80} />
        ) : opportunity ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '70%', height: '60%' }}>
            <ReactFlow nodes={initialNodes} edges={initialEdges} />
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
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