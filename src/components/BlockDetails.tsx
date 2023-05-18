import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import { generateSearchUrl } from './Search';
import { BlockData } from './Blocks';
import { OpportunityData } from './Block';
import styles from './../styles/BlockDetails.module.css';
import ReactFlow, { Position } from 'reactflow';

import 'reactflow/dist/style.css';
import './overview.css';
import OpportunityArray from './OpportunityArray';
import { LOCAL_IP_ADDRESS } from '../App';

const proOptions = { hideAttribution: true };
interface IBlockDetails {
}

const BlockDetails: React.FC<IBlockDetails> = () => {
  const theme = useTheme();
  const { blockNumber = '0', opportunityIndex = '0' } = useParams();
  const [searchResults, setSearchResults] = useState<BlockData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [opportunity, setOpportunity] = useState<OpportunityData>();
  const [initialNodes, setInitialNodes] = useState<any[]>([]);
  const [initialEdges, setInitialEdges] = useState<any[]>([]);
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const apiRequest = async ({ searchInput }: { searchInput: string }) => {
    setIsLoading(true);
    try {
      const response = await fetch(generateSearchUrl(`http://${LOCAL_IP_ADDRESS}:3001/api/search?`, searchInput, null, null, true));
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
      if (isSmallScreen) {
        setInitialNodes([
          {
            id: '1', position: { x: 150, y: 20 }, data: {
              label:
                <Typography variant="h6">EOA</Typography>
            }, sourcePosition: Position.Left,
            targetPosition: Position.Right,
            draggable: false,
            className: 'logoInside',
          },
          {
            id: '2', position: { x: 50, y: 400 }, data: {
              label:
                <div className={styles.logoInside}>
                  <img src={opportunity.buyMarketLogo} alt={opportunity.buyMarketName} width="30" height="30" />
                </div>
            }, sourcePosition: Position.Right,
            draggable: false,
            className: 'buyMarket',
          },
          {
            id: '3', position: { x: 250, y: 400 }, data: {
              label:
                <div className={styles.logoInside}>
                  <img src={opportunity.sellMarketLogo} alt={opportunity.sellMarketName} width="30" height="30" />
                </div>
            }, sourcePosition: Position.Top,
            targetPosition: Position.Left,
            draggable: false,
            className: 'sellMarket',
          },
        ]);
      } else if (isMediumScreen) {
        setInitialNodes([
          {
            id: '1', position: { x: 210, y: 20 }, data: {
              label:
                <Typography variant="h6">EOA</Typography>
            }, sourcePosition: Position.Left,
            targetPosition: Position.Right,
            draggable: false,
            className: 'logoInside',
          },
          {
            id: '2', position: { x: 70, y: 400 }, data: {
              label:
                <div className={styles.logoInside}>
                  <img src={opportunity.buyMarketLogo} alt={opportunity.buyMarketName} width="30" height="30" />
                </div>
            }, sourcePosition: Position.Right,
            draggable: false,
            className: 'buyMarket',
          },
          {
            id: '3', position: { x: 330, y: 400 }, data: {
              label:
                <div className={styles.logoInside}>
                  <img src={opportunity.sellMarketLogo} alt={opportunity.sellMarketName} width="30" height="30" />
                </div>
            }, sourcePosition: Position.Top,
            targetPosition: Position.Left,
            draggable: false,
            className: 'sellMarket',
          },
        ]);
      }
      else {
        setInitialNodes([
          {
            id: '1', position: { x: 300, y: 20 }, data: {
              label:
                <Typography variant="h6">EOA</Typography>
            }, sourcePosition: Position.Left,
            targetPosition: Position.Right,
            draggable: false,
            className: 'logoInside',
          },
          {
            id: '2', position: { x: 70, y: 400 }, data: {
              label:
                <div className={styles.logoInside}>
                  <img src={opportunity.buyMarketLogo} alt={opportunity.buyMarketName} width="40" height="40" />
                </div>
            }, sourcePosition: Position.Right,
            draggable: false,
            className: 'buyMarket',
          },
          {
            id: '3', position: { x: 550, y: 400 }, data: {
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
    }
  }, [opportunity, isMediumScreen, isSmallScreen]);

  useEffect(() => {
    if (opportunity) {
      setInitialEdges([
        { id: 'e1-2', source: '1', target: '2', type: 'step', animated: true, label: opportunity.deltaYa.toFixed(10) + " " + opportunity.baseSymbol },
        { id: 'e2-3', source: '2', target: '3', type: 'step', animated: true, label: -opportunity.deltaXa.toFixed(10) + " " + opportunity.tokenSymbol },
        { id: 'e3-1', source: '3', target: '1', type: 'step', animated: true, label: `${' '}${-opportunity.deltaYb.toFixed(10)}${' '}${opportunity.baseSymbol}${' '}` }
      ]
      );
    }
  }, [opportunity]);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: 5 }}>
        {isLoading ? (
          <CircularProgress color="inherit" size={80} />
        ) : opportunity ? (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '700px', height: '500px', boxShadow: 'inset 0 0 4px rgba(0, 0, 0, 0.25)', backgroundColor: theme.colors.backgroundSides, marginBottom: 5 }}>
              <ReactFlow nodes={initialNodes} edges={initialEdges} panOnDrag={false} panOnScroll={false} zoomOnScroll={false} zoomOnPinch={false} zoomOnDoubleClick={false} proOptions={proOptions} />
            </Box>
            

            <Box sx={{ width: '75%', boxShadow: '-8px -8px 10px rgba(0, 0, 0, 1)' }} >
              <OpportunityArray opportunity={opportunity} />
            </Box>
          </>
        ) : (
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', color: theme.palette.text.primary }}>
            No results
          </Typography>
        )}
      </Box >
    </>
  );
}

export default BlockDetails;