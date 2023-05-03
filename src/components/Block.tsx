import { Box, Link, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import { BlockData, OpportunityData } from './Blocks';
import BlockDetails from './BlockDetails';

const Opportunity: React.FC<OpportunityData> = ({ buyMarketAddress, sellMarketAddres, deltaXa, deltaYa, deltaYb, profit }) => {
  return (
    <Box sx={{ borderTop: '1px dotted gray', paddingBottom: 1, marginBottom: 1, paddingTop: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="logo192.png" alt="Exchange 1 Logo" width="50" height="50" /><Typography variant="body1" sx={{ marginLeft: 2, marginRight: 2 }}> {deltaYa} → {-deltaXa} → {deltaYb}</Typography><img src="logo192.png" alt="Exchange 2 Logo" width="50" height="50" />
      </Box>
      <Typography variant="body1"><b>Profit: {profit}</b></Typography>
    </Box>
  );
};

const Block: React.FC<BlockData> = React.forwardRef(({ blockNumber, opportunities }, ref) => {
  const [selectedBlock, setSelectedBlock] = useState<null | { blockNumber: number, opportunities: OpportunityData[], ref: React.ForwardedRef<HTMLDivElement> }>(null);;
  const content = opportunities.length === 0
    ? (<Typography variant="body1" sx={{ color: '#ffffff' }}>No opportunities at this block</Typography>)
    : (opportunities.map((opportunity, index) => <Opportunity key={index} {...opportunity} />));

  const handleClick = () => {
    console.log("click");
    setSelectedBlock({ blockNumber, opportunities, ref });
  };
  return (
    <>
      <Box ref={ref} data-block-number={blockNumber} sx={{ display: 'flex', alignItems: 'center', margin: '0 auto' }}>
        <Paper square sx={{ paddingLeft: 1, paddingRight: 1, width: '70%', height: '175px', backgroundColor: '#6389be', display: 'flex', flexDirection: 'column', alignItems: 'start', margin: 'auto' }} onClick={handleClick}>
          <Typography variant="h4" sx={{ color: '#eae6e1' }}><b>{blockNumber}</b></Typography>
          {content}
          <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'end', width: '100%', height: '100%' }}>
            <Link underline='hover' sx={{ color: '#eae6e1', fontSize: '0.8rem' }} href={`https://etherscan.io/block/${blockNumber}`}>Voir sur Etherscan</Link>
          </Box>
        </Paper>
      </Box>
      {selectedBlock && <BlockDetails block={selectedBlock} onClose={() => setSelectedBlock(null)} />}
    </>
  );
});

export default Block;
