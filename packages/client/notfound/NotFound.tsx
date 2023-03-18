import { Box, Typography } from "@mui/material";
import React from "react";
import { NotFoundIcon } from "./NotFoundIcon";

interface NotFoundProps {
  text: React.ReactNode;
}

export const NotFound: React.FC<NotFoundProps> = ({ text }) => {
  return (
    <Box
      sx={(theme) => ({
        width: 1,
        height: 1,
        p: 5,
        textAlign: "center",
        color: theme.palette.primary?.main,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      })}
    >
      <Box>
        <NotFoundIcon sx={{ fontSize: "10rem" }} />
      </Box>
      <Box>
        <Typography component="h2" variant="h2">
          {text}
        </Typography>
      </Box>
    </Box>
  );
};
