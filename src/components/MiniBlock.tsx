import { Box, Paper, Typography, useTheme } from "@mui/material";
import React from "react";
import { BLOCK_MARGIN_TOP, BLOCK_MIN_HEIGHT, OPPORTUNITY_FULL_HEIGHT, heightScaleFactor } from "./constants";


const miniblockWidth = '75%';
const miniblockVerticalPadding = BLOCK_MARGIN_TOP * heightScaleFactor;
const miniBlockBaseHeight = BLOCK_MIN_HEIGHT * heightScaleFactor;
const miniBlockOpportunityHeight = OPPORTUNITY_FULL_HEIGHT * heightScaleFactor;

const MiniBlock: React.FC<{ nbOpportunities: number }> = React.forwardRef(({ nbOpportunities }, ref) => {
  const theme = useTheme();
  const miniBlockheight = nbOpportunities > 1 ?  miniBlockBaseHeight + miniBlockOpportunityHeight * (nbOpportunities - 1) : miniBlockBaseHeight;

  return (
      <Box
        ref={ref}
        sx={{
          my: `${miniblockVerticalPadding}px`
        }}
      >
        <Paper
          square
          sx={{
            paddingLeft: 1,
            paddingRight: 1,
            width: miniblockWidth,
            height: `${miniBlockheight}px`,
            alignItems: "center",  
            justifyContent: "center", 
            backgroundColor: theme.colors.blockColor,
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            position: "relative",
          }}
        >
          <Typography  sx={{ color: theme.colors.textOnBlock }}>
            <b>{nbOpportunities}</b>
          </Typography>
        </Paper>
      </Box>
  );
});

export default MiniBlock;
