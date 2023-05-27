import { makeAutoObservable } from "mobx";
import React from "react";
import { UserStore } from "./UserStore";
import { ApiRequest } from "@modules/api";

export class MainStore {
  userStore: UserStore;
  localStorage: Storage;
  private requestFn: <D, R>(request: ApiRequest<D>) => Promise<R>;

  constructor({
    localStorage,
    requestFn,
  }: {
    localStorage: Storage;
    requestFn: (data: any) => Promise<any>;
  }) {
    makeAutoObservable(this);
    this.userStore = new UserStore(this);
    this.localStorage = localStorage;
    this.requestFn = requestFn;
  }

  makeRequest<D>(request: D): Promise<D> {
    return this.requestFn(request as ApiRequest);
  }
}

const MainStoreContext = React.createContext<MainStore>(
  null as unknown as MainStore
);

interface MainStoreProviderProps {
  children: React.ReactNode;
  onMakeRequest: (request: ApiRequest) => Promise<any>;
}

export const MainStoreProvider: React.FC<MainStoreProviderProps> = ({
  children,
  onMakeRequest,
}) => {
  const [mainStore, setMainStore] = React.useState<MainStore | null>(null);
  React.useEffect(() => {
    // LocalStorage недоступен до отрисовки на клиенте в Next.js
    setMainStore(new MainStore({ localStorage, requestFn: onMakeRequest }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
