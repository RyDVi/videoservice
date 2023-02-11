import { Button } from "@mui/material";
import React from "react";
import { useBoolean } from "../../hooks";
import MenuIcon from "@mui/icons-material/Menu";
import { MobileSidebar } from "./MobileSidebar";
import { useRouter } from "next/router";

interface MenuSidebarContextProps {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
}

const MenuSidebarContext = React.createContext<MenuSidebarContextProps>({
  isSidebarOpen: false,
  openSidebar: () => null,
  closeSidebar: () => null,
});

export const MenuSidebarProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [isSidebarOpen, { setTrue: openSidebar, setFalse: closeSidebar }] =
    useBoolean(false);
  const contextValue = React.useMemo(
    () => ({ isSidebarOpen, openSidebar, closeSidebar }),
    [closeSidebar, isSidebarOpen, openSidebar]
  );
  return (
    <MenuSidebarContext.Provider value={contextValue}>
      {children}
    </MenuSidebarContext.Provider>
  );
};
export function useMenuSidebar() {
  const sidebarContext = React.useContext(MenuSidebarContext);
  if (!sidebarContext) {
    throw new Error("MenuSidebarContext is not available");
  }
  return sidebarContext;
}

function useWas(): [boolean, () => void] {
  const [isWas, setIsWas] = React.useState(false);
  const setUserIsWasHere = React.useCallback(() => setIsWas(true), []);
  return [isWas, setUserIsWasHere];
}

interface MenuSidebarProps {
  children: React.ReactNode;
}

export const MenuSidebar: React.FC<MenuSidebarProps> = ({ children }) => {
  const { closeSidebar, isSidebarOpen, openSidebar } = useMenuSidebar();
  const [isNeedRender, setIsNotNeedRender] = useWas();
  return (
    <>
      <Button
        onClick={() => {
          setIsNotNeedRender();
          openSidebar();
        }}
        endIcon={<MenuIcon />}
      />
      <MobileSidebar
        anchor="left"
        open={isSidebarOpen}
        onClose={closeSidebar}
        onOpen={() => {
          setIsNotNeedRender();
          openSidebar();
        }}
      >
        {isSidebarOpen || isNeedRender ? children : null}
      </MobileSidebar>
    </>
  );
};

export const SidebarCloser: React.FC = () => {
  const router = useRouter();
  const { closeSidebar } = useMenuSidebar();
  React.useEffect(() => {
    closeSidebar();
  }, [closeSidebar, router.asPath]);
  return <></>;
};
