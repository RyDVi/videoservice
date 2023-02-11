import React from "react";
import { Box } from "@mui/material";

interface LogoProps {}
const Logo: React.FC<LogoProps> = (props) => (
  <Box
    component="svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 74"
    sx={{ padding: "16px", height: "100%" }}
    {...props}
  >
    <path
      fill="#cf4d4f"
      d="m37.1,0.05l0.1,0q4.2,0 8.6,1.3q4.4,1.3 8.55,3.6q4.15,2.3 7.85,5.45q3.7,3.15 6.45,6.85q2.75,3.7 4.35,7.8q1.6,4.1 1.6,8.3l0,0q0,5.3 -1.8,10.25q-1.8,4.95 -5.1,9.05l0,0q-5,6.1 -12.2,9l0,0q-0.6,0.2 -0.4,0.9l0,0l3.4,9.2q0.2,0.5 -0.05,0.85q-0.25,0.35 -0.75,0.35l0,0l-15.8,0q-0.2,0 -0.3,-0.1l0,0l-6.9,-2.5q-0.5,-0.1 -0.6,-0.6l0,0l-2.2,-5.9l-7.7,0q-0.9,0 -0.9,0.9l0,0l0,7.2q0,1 -0.9,1l0,0l-14.9,0q-0.2,0 -0.3,-0.1l0,0l-6.7,-2.4q-0.7,-0.2 -0.7,-1l0,0l0,-69.4l36.7,0l0.6,0zm-3.1,57.9l2.8,7.5q0.2,0.7 1.1,0.7l0,0l6.1,0q0.6,0 0.95,-0.5q0.35,-0.5 0.15,-1l0,0l-2.7,-7.2q-0.2,-0.4 0,-0.7q0.2,-0.3 0.5,-0.4l0,0q4.3,-1 8,-3.4q3.7,-2.4 6.4,-5.8q2.7,-3.4 4.2,-7.55q1.5,-4.15 1.5,-8.85l0,0q0,-5.5 -2.1,-10.35q-2.1,-4.85 -5.75,-8.45q-3.65,-3.6 -8.5,-5.7q-4.85,-2.1 -10.35,-2.1l0,0l-31.3,0q-1.2,0 -1.2,1.1l0,0l0,59.8q0,1.1 1.2,1.1l0,0l5.7,0q1.1,0 1.1,-1.1l0,0l0,-6.7q0,-1.2 1.2,-1.2l0,0l19.9,0q0.8,0 1.1,0.8l0,0zm21,-27.3l0,0q0,3.8 -1.45,7.2q-1.45,3.4 -3.95,5.9q-2.5,2.5 -5.9,3.95q-3.4,1.45 -7.2,1.45l0,0l-3.6,0l-19.9,0q-1.2,0 -1.2,-1.1l0,0l0,-34.8q0,-1.1 1.2,-1.1l0,0l19.9,0l3.4,0q3.8,0 7.2,1.45q3.4,1.45 5.95,3.95q2.55,2.5 4.05,5.9q1.5,3.4 1.5,7.2zm-31.7,14.5l13.1,0q3,0 5.65,-1.15q2.65,-1.15 4.65,-3.1q2,-1.95 3.15,-4.6q1.15,-2.65 1.15,-5.65l0,0q0.1,-3.7 -1.55,-6.75q-1.65,-3.05 -4.45,-5.05l0,0l-1,0l-19.8,0q-0.9,0 -0.9,0.8l0,0l0,25.5zm126.8,-45.1l4.7,1.7q1.1,0.4 1.45,1.5q0.35,1.1 -0.35,2l0,0l-29.5,44q-0.4,0.8 -0.4,1.2l0,0l0,19.8q0,1 -0.65,1.65q-0.65,0.65 -1.65,0.65l0,0l-13.2,0q-0.5,0 -0.8,-0.1l0,0l-5.7,-2.1q-1.4,-0.5 -1.4,-2l0,0l0,-20.9q0,-0.3 -0.2,-0.7l0,0l-31.4,-46.7l19.3,0l7.2,2.6q0.2,0.1 0.6,0.5l0,0l14.3,22.8q0.4,0.5 1.05,0.5q0.65,0 0.95,-0.5l0,0l15.7,-24.9q0.7,-1 1.8,-1l0,0l18.2,0zm-71,5l27.1,40.3q0.3,0.6 0.3,1.2l0,0l0,17.5q0,0.8 0.55,1.35q0.55,0.55 1.35,0.55l0,0l4.2,0q1.9,0 1.9,-1.9l0,0l0,-17.5q0,-0.4 0.4,-1.2l0,0l27.1,-40.3q0.2,-0.4 0,-0.75q-0.2,-0.35 -0.6,-0.35l0,0l-8,0q-0.5,0 -0.6,0.3l0,0l-21.6,34.4q-0.2,0.3 -0.65,0.3q-0.45,0 -0.65,-0.3l0,0l-21.6,-34.4q-0.3,-0.3 -0.6,-0.3l0,0l-8,0q-0.4,0 -0.6,0.35q-0.2,0.35 0,0.75l0,0zm144,14.3l-38.9,0q-1,0 -1,1l0,0l0,13q0,1.4 1.3,1.4l0,0l23.6,0l0.3,0l6.7,2.5q0.7,0.2 0.7,0.9l0,0l0,14.2q0,1 -1,1l0,0l-30.6,0q-1,0 -1,1l0,0l0,17.4q0,1.1 -1.1,1.1l0,0l-14.6,0q-0.2,0 -0.4,-0.1l0,0l-6.6,-2.4q-0.7,-0.2 -0.7,-1l0,0l0,-68.9l56.4,0q0.3,0 0.5,0.1l0,0l6.7,2.4q0.6,0.4 0.6,0.9l0,0l0,14.5q0,1 -0.9,1l0,0zm-59.4,-14.7l0,0q0,0.1 -0.05,0.2q-0.05,0.1 -0.05,0.2l0,0l0,60.4q0,0.9 0.8,0.9l0,0l6.4,0q0.3,0 0.6,-0.3l0,0q0.2,-0.2 0.2,-0.6l0,0l0,-17.9q0,-0.8 0.8,-0.8l0,0l31,0q1,0 1,-1l0,0l0,-6q0,-1 -1,-1l0,0l-31,0q-0.3,0 -0.7,-0.4l0,0l0,-0.1l0,-0.1q-0.1,-0.1 -0.1,-0.3l0,0l0,-24.5q0,-0.2 0.05,-0.3q0.05,-0.1 0.05,-0.2l0,0q0.4,-0.4 0.7,-0.4l0,0l39.4,0q0.8,0 0.8,-0.8l0,0l0,-6.6q0,-0.4 -0.2,-0.6l0,0q-0.2,-0.2 -0.6,-0.2l0,0l-47.4,0q-0.4,0 -0.7,0.4zm77.2,-4.6l0.2,0l6.9,2.6q0.5,0.2 0.5,0.6l0,0l0,68.6q0,1 -1,1l0,0l-14.8,0q-0.2,0 -0.4,-0.1l0,0l-6.6,-2.4q-0.7,-0.3 -0.7,-1l0,0l0,-69.3l15.9,0zm-4.6,3.9l-6.6,0q-0.7,0 -0.7,0.7l0,0l0,60.6q0,1 1,1l0,0l6,0q1,0 1,-1l0,0l0,-60.6q0,-0.7 -0.7,-0.7l0,0zm39,50.1l29.4,0q0.2,0 0.3,0.1l0,0l6.7,2.4q0.7,0.4 0.7,1l0,0l0,14.2q0,1 -1.1,1l0,0l-51.8,0l-0.4,0l-6.6,-2.4q-0.7,-0.3 -0.7,-1l0,0l0,-69.3l15.8,0q0.2,0 0.3,0.1l0,0l6.7,2.4q0.7,0.2 0.7,0.9l0,0l0,50.6zm-19.5,-49l0,60.1q0,0.9 1,0.9l0,0l43.1,0q1,0 1,-0.9l0,0l0,-6.1q0,-1 -1,-1l0,0l-35.1,0q-1,0 -1,-0.9l0,0l0,-52.1q0,-1 -1,-1l0,0l-6,0q-1,0 -1,1l0,0zm109.4,-5l14.3,0q0.3,0 0.4,0.1l0,0l6.7,2.4q0.6,0.3 0.6,0.9l0,0l0,68.5q0,0.9 -0.9,0.9l0,0l-14.9,0q-0.2,0 -0.3,-0.1l0,0l-6.8,-2.4q-0.6,-0.4 -0.6,-0.9l0,0l0,-11.3q0,-0.2 -0.1,-0.25q-0.1,-0.05 -0.2,0.15l0,0l-1.7,3.5q-0.3,0.5 -0.8,0.5l0,0l-11.8,0l-0.3,0l-7,-2.6q-0.3,0 -0.5,-0.4l0,0l-1.8,-3.6q-0.1,-0.2 -0.2,-0.2q-0.1,0 -0.1,0.2l0,0l0,16.4q0,1 -1,1l0,0l-14.8,0q-0.3,0 -0.4,-0.1l0,0l-6.6,-2.4q-0.8,-0.3 -0.8,-1l0,0l0,-69.3l14.8,0q0.2,0 0.4,0.1l0,0l6.9,2.5q0.4,0.1 0.6,0.5l0,0l12.5,25.9l13.8,-28.6q0.2,-0.4 0.6,-0.4l0,0zm10.5,65.2l0,-60.4q0,-0.8 -0.8,-0.8l0,0l-7.1,0q-0.6,0 -0.7,0.4l0,0l-18.2,37.6q-0.4,0.8 -1.25,0.8q-0.85,0 -1.25,-0.8l0,0l-18.1,-37.6q-0.1,-0.4 -0.7,-0.4l0,0l-7.2,0q-0.8,0 -0.8,0.8l0,0l0,60.4q0,0.8 0.8,0.8l0,0l6.4,0q0.8,0 0.8,-0.8l0,0l0,-40.5q0,-0.6 0.6,-0.7q0.6,-0.1 0.8,0.4l0,0l14.5,30.1q0.5,0.8 1.3,0.8l0,0l5.8,0q0.8,0 1.3,-0.8l0,0l14.4,-30.1q0.3,-0.5 0.85,-0.4q0.55,0.1 0.55,0.7l0,0l0,40.5q0,0.8 0.9,0.8l0,0l6.3,0q0.8,0 0.8,-0.8l0,0z"
      id="SvgjsPath50252743"
    />
  </Box>
);

export default Logo;
