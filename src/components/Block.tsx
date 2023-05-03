import { Box, Link, Paper, Typography } from '@mui/material';
import React from 'react';
import { BlockData } from './Blocks';

export interface OpportunityData {
  buyMarketAddress: string,
  buyMarketName: string,
  buyMarketLogo: string,
  sellMarketAddress: string,
  sellMarketName: string,
  sellMarketLogo: string,
  token0Address: string,
  token0Name: string | undefined,
  token0Symbol: string | undefined
  token0Logo: string,
  token1Address: string,
  token1Name: string | undefined,
  token1Symbol: string | undefined,
  token1Logo: string,
  deltaXa: number,
  deltaYa: number,
  deltaXb: number,
  deltaYb: number,
  profitEth: number,
  profitDol: number
}

const Opportunity: React.FC<OpportunityData & { key: number, blockNumber: number }> = ({
  buyMarketLogo,
  sellMarketLogo,
  token0Symbol,
  token1Symbol,
  deltaYa,
  deltaXa,
  deltaYb,
  profitDol,
  key,
  blockNumber
}) => {
  const opportunityLink = `/block/${blockNumber}/opportunity/${key}`;
  return (
    <Link href={opportunityLink} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '95%', height: '100px', backgroundColor: '#eae6e1', marginBottom: '30px', borderRadius: '3px', padding: '10px',  textDecoration: 'none' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <img src={buyMarketLogo} alt="Exchange 1 Logo" width="40" height="40" />
        <Typography variant="body1" sx={{ marginLeft: '4vw', marginRight: '4vw', fontSize: '1.2em' }}> {deltaYa.toFixed(2)} ETH → {-deltaXa.toFixed(2)} → {-deltaYb.toFixed(2)} ETH </Typography>
        <img src={sellMarketLogo} alt="Exchange 2 Logo" width="40" height="40" />
      </Box>
      <Typography variant="body1" sx={{ fontFamily: 'Arial', fontSize: '1em' }}>Profit: <b>{profitDol.toFixed(2)} $</b></Typography>
    </Link>
  );  
};


const Block: React.FC<BlockData> = React.forwardRef(({ blockNumber, opportunities }, ref) => {
  const content = opportunities.length === 0
    ? (<Box sx={{ width: '100%' }}><Typography variant="body1" sx={{ color: '#ffffff' }}>No opportunities at this block</Typography></Box>)
    : (opportunities.map((opportunity, index) => <Opportunity key={index} blockNumber={blockNumber} {...opportunity} />));

  return (
    <>
      <Box ref={ref} data-block-number={blockNumber} sx={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}>
        <Paper square sx={{ paddingLeft: 1, paddingRight: 1, width: '70%', minHeight: '175px', height: '100%', backgroundColor: '#6389be', display: 'flex', flexDirection: 'column', alignItems: 'start', margin: 'auto', position: 'relative' }}>
          <Typography variant="h4" sx={{ color: '#eae6e1' }}><b>{blockNumber}</b></Typography>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {content}
          </Box>
          <Box sx={{ position: 'absolute', bottom: 0, right: 0, marginRight: '5px' }}>
            <Link underline='hover' sx={{ color: '#eae6e1', fontSize: '0.8rem' }} href={`https://etherscan.io/block/${blockNumber}`}>Voir sur Etherscan</Link>
          </Box>
        </Paper>
      </Box>
    </>
  );
});

export default Block;
