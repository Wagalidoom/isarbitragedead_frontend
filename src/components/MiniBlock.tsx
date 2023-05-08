import { Box, Paper, Typography } from "@mui/material";
import React from "react";

export const MINIBLOCK_HEIGHT = 50;
export const MINIBLOCK_VERTICAL_PADDING = 2;

const MiniBlock: React.FC<{ nbOpportunities: number }> = React.forwardRef(({ nbOpportunities }, ref) => {
  const miniBlockWidth = (50 + nbOpportunities * 10).toString() + "%";

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
            width: miniBlockWidth,
            height: `${MINIBLOCK_HEIGHT}px`,
            backgroundColor: "#6389be",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            margin: "auto",
            position: "relative",
          }}
        >
          <Typography variant="h4" sx={{ color: "#eae6e1" }}>
            <b>{nbOpportunities}</b>
          </Typography>
        </Paper>
      </Box>
  );
});

export default MiniBlock;
