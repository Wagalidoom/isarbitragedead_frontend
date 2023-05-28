import { Box, Link, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { BlockData } from './Blocks';
import { useNavigate } from 'react-router-dom';
import { opportunityHeight, opportunityMarginBottom, BLOCK_MIN_HEIGHT, blockNumberContainerSize, blockNumberFontSize } from './constants';

export interface OpportunityData {
  [key: string]: string | number | undefined; // Index signature
  buyMarketAddress: string,
  buyMarketName: string,
  buyMarketLogo: string,
  sellMarketAddress: string,
  sellMarketName: string,
  sellMarketLogo: string,
  tokenAddress: string,
  tokenName: string | undefined,
  tokenSymbol: string | undefined
  tokenLogo: string,
  baseAddress: string,
  baseName: string | undefined,
  baseSymbol: string | undefined,
  baseLogo: string,
  deltaXa: number,
  deltaYa: number,
  deltaXb: number,
  deltaYb: number,
  profitEth: number,
  profitDol: number
}

const Opportunity: React.FC<OpportunityData & { opportunityIndex: number, blockNumber: number }> = ({
  buyMarketLogo,
  sellMarketLogo,
  tokenSymbol,
  baseSymbol,
  deltaYa,
  deltaXa,
  deltaYb,
  profitDol,
  opportunityIndex,
  blockNumber
}) => {
  const theme = useTheme();
  const opportunityLink = `/block/${blockNumber}/opportunity/${opportunityIndex}`;
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const fontSize = isSmallScreen ? '0.5em' : '1.2em';
  const imgSize = isSmallScreen ? '20' : '40';

  const handleClick = () => {
    navigate(opportunityLink);
  };

  return (
    <Paper elevation={1} onClick={handleClick} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '95%', height: `${opportunityHeight}px`,  backgroundColor: theme.colors.accentuation, marginBottom: `${opportunityMarginBottom}px`, borderRadius: '3px', padding: '10px', cursor: 'pointer' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
        <img src={buyMarketLogo} alt="Exchange 1 Logo" width={imgSize} height={imgSize} />
        <Typography sx={{ color: theme.palette.text.secondary, marginLeft: '2vw', marginRight: '2vw', fontSize: fontSize }}> <b>{deltaYa.toFixed(4)}</b> {baseSymbol}  → <b>{-deltaXa.toFixed(2)}</b> {tokenSymbol}  → <b>{-deltaYb.toFixed(4)}</b> {baseSymbol}  </Typography>
        <img src={sellMarketLogo} alt="Exchange 2 Logo" width={imgSize} height={imgSize} />
      </Box>
      <Typography variant="body1" sx={{ color: theme.palette.text.secondary, fontSize: fontSize }}>Profit: <b>{profitDol.toFixed(2)} $</b></Typography>
    </Paper>
  );  
};


const Block: React.FC<BlockData> = React.memo(({ blockNumber, opportunities }) => {
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const fontSize = isSmallScreen ? '15px' : '30px';
  const adjustedBlockNumberFontSize = isSmallScreen ? blockNumberFontSize / 1.5 : blockNumberFontSize;

  const content = opportunities.length === 0
    ? (<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'  }}><Typography  sx={{ color: theme.colors.textOnBlock, fontSize: fontSize }}>No opportunities at this block</Typography></Box>)
    : (opportunities.map((opportunity, index) => <Opportunity key={index} opportunityIndex={index} blockNumber={blockNumber} {...opportunity} />));

  return (
    <>
      <Box data-block-number={blockNumber} sx={{ display: 'flex', alignItems: 'center'}}>
        <Paper square sx={{ paddingLeft: 1, paddingRight: 1, width: '70%', minHeight: `${BLOCK_MIN_HEIGHT}px`, backgroundColor: theme.colors.blockColor, display: 'flex', flexDirection: 'column', alignItems: 'start', margin: 'auto', position: 'relative' }}>
          <Typography  sx={{ height:`${blockNumberContainerSize}px`, fontSize: `${adjustedBlockNumberFontSize}px`, color: '#eae6e1' }}><b>{blockNumber}</b></Typography>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            {content}
          </Box>
          <Box sx={{ position: 'absolute', bottom: 0, right: 0, marginRight: '5px' }}>
            <Link underline='hover' sx={{ color: theme.colors.backgroundPrimary, fontSize: '0.8rem' }} href={`https://etherscan.io/block/${blockNumber}`}>View on etherscan</Link>
          </Box>
        </Paper>
      </Box>
    </>
  );
});

export default Block;
