import { SwipeableDrawer, SwipeableDrawerProps } from "@mui/material";

interface MobileSidebarProps extends SwipeableDrawerProps {}

export const MobileSidebar: React.FC<MobileSidebarProps> = (props) => {
  return <SwipeableDrawer {...props}></SwipeableDrawer>;
};
