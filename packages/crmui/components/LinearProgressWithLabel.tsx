import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";
import React from "react";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export const LinearProgressNormalized: React.FC<
  Omit<LinearProgressProps, "value"> & { value?: number | null }
> = ({ value, ...props }) => {
  if (!value || value >= 1) {
    return null;
  }
  return <LinearProgressWithLabel value={value * 100} {...props} />;
};
