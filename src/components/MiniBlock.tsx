import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { BLOCK_MARGIN_TOP, BLOCK_MIN_HEIGHT, OPPORTUNITY_FULL_HEIGHT, heightScaleFactor } from "./constants";


const miniblockWidth = '100%';
const miniblockVerticalPadding = BLOCK_MARGIN_TOP * heightScaleFactor;
const miniBlockBaseHeight = BLOCK_MIN_HEIGHT * heightScaleFactor;
const miniBlockOpportunityHeight = OPPORTUNITY_FULL_HEIGHT * heightScaleFactor;

const MiniBlock: React.FC<{ nbOpportunities: number }> = React.forwardRef(({ nbOpportunities }, ref) => {
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
            backgroundColor: "#6389be",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            margin: "auto",
            position: "relative",
          }}
        >
          <Typography  sx={{ color: "#eae6e1" }}>
            <b>{nbOpportunities}</b>
          </Typography>
        </Paper>
      </Box>
  );
});

export default MiniBlock;
