import { IconButton } from "@mui/material";
import React from "react";
import { useBoolean } from "@modules/hooks";
import MenuIcon from "@mui/icons-material/Menu";
import { MobileSidebar } from "./MobileSidebar";
import { useRouter } from "next/router";

interface SidebarContextProps {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextProps>({
  isSidebarOpen: false,
  openSidebar: () => null,
  closeSidebar: () => null,
});

export const SidebarProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, { setTrue: openSidebar, setFalse: closeSidebar }] =
    useBoolean(false);
  const contextValue = React.useMemo(
    () => ({ isSidebarOpen, openSidebar, closeSidebar }),
    [closeSidebar, isSidebarOpen, openSidebar]
  );
  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};
function useSidebar() {
  const sidebarContext = React.useContext(SidebarContext);
  if (!sidebarContext) {
    throw new Error("MenuSidebarContext is not available");
  }
  return sidebarContext;
}
interface SidebarProps {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const { closeSidebar, isSidebarOpen, openSidebar } = useSidebar();
  return (
    <MobileSidebar
      anchor="left"
      open={isSidebarOpen}
      onClose={closeSidebar}
      onOpen={openSidebar}
    >
      {children}
    </MobileSidebar>
  );
};

export const SidebarToggler: React.FC = () => {
  const { openSidebar } = useSidebar();
  return (
    <IconButton onClick={openSidebar} color='primary'>
      <MenuIcon />
    </IconButton>
  );
};

export const SidebarCloser: React.FC = () => {
  const router = useRouter();
  const { closeSidebar } = useSidebar();
  React.useEffect(() => {
    closeSidebar();
  }, [closeSidebar, router.asPath]);
  return <></>;
};
