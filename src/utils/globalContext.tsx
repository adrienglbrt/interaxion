import { GlobalProps } from "@/types/interfaces";
import React, { createContext, useContext } from "react";

const GlobalContext = createContext<GlobalProps | null>(null);

export const GlobalProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: GlobalProps;
}) => {
  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (context === null) {
    throw new Error("useGlobal must be used within a GlobalProvider");
  }
  return context;
};
