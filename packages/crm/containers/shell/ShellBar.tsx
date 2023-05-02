import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { usePageContext } from "../../contexts";

interface ShellProps {
  className?: string;
}

export const ShellBar: React.FC<ShellProps> = ({ className }) => {
  const {
    state: {
      pageInfo: { title },
    },
  } = usePageContext();
  return (
    <AppBar
      position="sticky"
      className={className}
      sx={{ position: "sticky", top: 0 }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
};
