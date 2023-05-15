import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { OpportunityData } from './Block';
import { Link } from 'react-router-dom';

const blockDetailsConfig = [
    { key: 'buyMarketAddress', name: 'Buy market address', link: true },
    { key: 'buyMarketName', name: 'Buy market name', logo: true, logoKey: 'buyMarketLogo' },
    { key: 'sellMarketAddress', name: 'Sell market address', link: true },
    { key: 'sellMarketName', name: 'Sell market name', logo: true, logoKey: 'sellMarketLogo' },
    { key: 'tokenAddress', name: 'Token address', link: true },
    { key: 'tokenName', name: 'Token name' },
    { key: 'tokenSymbol', name: 'Token symbol' },
    { key: 'tokenLogo', name: 'Token logo', logo: true },
    { key: 'baseAddress', name: 'Base currenccy address', link: true },
    { key: 'baseName', name: 'Base currenccy name' },
    { key: 'baseSymbol', name: 'Base currenccy symbol' },
    { key: 'baseLogo', name: 'Base currenccy logo', logo: true },
    { key: 'deltaYa', name: 'Base amount in' },
    { key: 'deltaXa', name: 'Token quantity received' },
    { key: 'deltaYb', name: 'Base amount out' },
    { key: 'profitEth', name: 'Profit in ETH' },
    { key: 'profitDol', name: 'Profit in Dollar' },
];

interface IOpportunityArray {
    opportunity: OpportunityData;
}

const OpportunityArray: React.FC<IOpportunityArray> = ({ opportunity }) => {
    const etherscanLink = 'https://etherscan.io/address/';
    
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Grid container spacing={2}>
                {blockDetailsConfig.map((detail, index) => {
                    const value: any = (opportunity as any)[detail.key];
                    const itemStyle = index % 2 === 0 ? '#faf7f2' : '#f7f1e8';

                    return (
                        <React.Fragment key={index}>
                            <Grid item xs={6} style={{ backgroundColor: itemStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60px' }}>
                            <Typography sx={{ color: 'black', fontSize: 19, fontWeight: 'bold' }}>{detail.name}</Typography>
                            </Grid>
                            <Grid item xs={6} style={{ backgroundColor: itemStyle, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60px' }}>
                                {detail.link && !detail.logo && (
                                    <Typography sx={{ color: 'black' }}>
                                        <Link to={`${etherscanLink}${value}`} style={{ color: 'inherit' }}>{value}</Link>
                                    </Typography>
                                )}
                                {detail.logo && !detail.link && (
                                    detail.logoKey ?
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={{ color: 'black' }}>{value}</Typography>
                                            <img src={`${opportunity[detail.logoKey]}`} alt={`${detail.name}_logo`} width="40" height="40" style={{ marginLeft: '20px' }} />
                                        </Box> :
                                        <img src={value} alt={`${detail.name}_logo`} width="40" height="40" />
                                )}
                                {!detail.link && !detail.logo && (
                                    <Typography sx={{ color: 'black' }}>{value}</Typography>
                                )}
                            </Grid>
                        </React.Fragment>
                    );
                })}
            </Grid>
        </Box>
    );

};

export default OpportunityArray;