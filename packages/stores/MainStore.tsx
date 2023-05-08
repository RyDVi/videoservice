import { makeAutoObservable } from "mobx";
import React from "react";
import { UserStore } from "./UserStore";

export class MainStore {
  userStore: UserStore;
  localStorage: Storage;

  constructor(localStorage: Storage) {
    makeAutoObservable(this);
    this.userStore = new UserStore(this);
    this.localStorage = localStorage;
  }
}

const MainStoreContext = React.createContext<MainStore>(
  null as unknown as MainStore
);

export const MainStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mainStore, setMainStore] = React.useState<MainStore | null>(null);
  React.useEffect(() => {
    // LocalStorage недоступен до отрисовки на клиенте в Next.js
    setMainStore(new MainStore(localStorage));
  }, []);
  if (!mainStore) {
    return null;
  }
  return (
    <MainStoreContext.Provider value={mainStore}>
      {children}
    </MainStoreContext.Provider>
  );
};

export function useMainStoreContext() {
  const mainStoreContext = React.useContext(MainStoreContext);
  if (!mainStoreContext) {
    throw new Error("MainStoreContext is not available");
  }
  return mainStoreContext;
}
