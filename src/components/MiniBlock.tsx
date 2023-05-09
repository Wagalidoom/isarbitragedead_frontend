import { Box, Paper, Typography } from "@mui/material";
import React from "react";

export const MINIBLOCK_WIDTH = 100;
export const MINIBLOCK_VERTICAL_PADDING = 2;

const MiniBlock: React.FC<{ nbOpportunities: number }> = React.forwardRef(({ nbOpportunities }, ref) => {
  const miniBlockheight = nbOpportunities > 0 ?  10 + nbOpportunities * 10 : 20;

  return (
      <Box
        ref={ref}
        sx={{
          my: MINIBLOCK_VERTICAL_PADDING
        }}
      >
        <Paper
          square
          sx={{
            paddingLeft: 1,
            paddingRight: 1,
            width: `${MINIBLOCK_WIDTH}%`,
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
