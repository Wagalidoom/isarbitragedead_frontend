import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const MiniBlock: React.FC<{ nbOpportunities: number, highlighted: boolean }> = React.forwardRef(({ nbOpportunities, highlighted }, ref) => {
  const miniBlockWidth = (50 + nbOpportunities * 10).toString() + "%";
  const miniBlockHeight = 5 + nbOpportunities * 10;
  const backgroundColor = highlighted ? "#000000" : "#6389be";

  return (
      <Box
        ref={ref}
        sx={{
          my: 2
        }}
      >
        <Paper
          square
          sx={{
            paddingLeft: 1,
            paddingRight: 1,
            width: miniBlockWidth,
            minHeight: `${miniBlockHeight}px`,
            height: "100%",
            backgroundColor: backgroundColor,
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
