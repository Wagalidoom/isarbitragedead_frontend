import { Box, Link, Paper, Typography } from '@mui/material';
import React from 'react';
import { BlockData, OpportunityData } from './Blocks';

const Opportunity: React.FC<OpportunityData & { key: number, blockNumber: number }> = ({ buyMarketAddress, sellMarketAddres, deltaXa, deltaYa, deltaYb, profit, key, blockNumber }) => {
  const opportunityLink = `/block/${blockNumber}/opportunity/${key}`;
  return (
    <Link href={opportunityLink} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '95%', height: '100px', backgroundColor: '#eae6e1', marginBottom: '30px', borderRadius: '3px', padding: '10px', boxShadow: 'inset 0 0 5px #454545' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="logo192.png" alt="Exchange 1 Logo" width="50" height="50" />
        <Typography variant="body1" sx={{ marginLeft: 2, marginRight: 2 }}> {deltaYa} → {-deltaXa} → {deltaYb}</Typography>
        <img src="logo192.png" alt="Exchange 2 Logo" width="50" height="50" />
      </Box>
      <Typography variant="body1"><b>Profit: {profit}</b></Typography>
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
