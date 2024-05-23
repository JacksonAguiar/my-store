import React, { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";


interface NavigationState {
  lastRouter: string;
}

interface AuthContextData {
  lastRouter: string;
  navigateTo({router}): void;
}

const UseCustomNavigationContext = createContext<AuthContextData>(
  {} as AuthContextData
);

const UseCustomNavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const navigation = useNavigate();

  const [data, setData] = useState<NavigationState>(() => {
    const lastRouter = localStorage.getItem("@app:last-router");
    if (lastRouter) {
      return { lastRouter };
    }
    return {} as NavigationState;
  });

  const navigateTo = useCallback(
    ({ router }: any) => {
      localStorage.setItem("@app:lastRouter", router);

      setData(router);
      navigation(router);
    },
    [navigation]
  );

  return (
    <UseCustomNavigationContext.Provider
      value={{ lastRouter: data.lastRouter, navigateTo }}
    >
      {children}
    </UseCustomNavigationContext.Provider>
  );
};
function useCustomNavigation(): AuthContextData {
  const context = useContext(UseCustomNavigationContext);

  if (!context) {
    throw new Error("useCustomNavigation must be used within an AuthProvider");
  }
  return context;
}
export { UseCustomNavigationProvider, useCustomNavigation };
