import { SwipeableDrawer, SwipeableDrawerProps } from "@mui/material";
import React from "react";

interface MobileSidebarProps extends SwipeableDrawerProps {}

export const MobileSidebar: React.FC<MobileSidebarProps> = (props) => {
  return <SwipeableDrawer {...props} />;
};
