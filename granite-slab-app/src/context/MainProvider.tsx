import { useState, type ReactNode } from "react";
import { type ErrorState, MainContext } from "./MainContext";

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [materialsArray, setMaterialsArray] = useState<string[]>([]);
  const [sidebarContent, setSidebarContent] = useState<ReactNode | null>(null);
  const [error, setError] = useState<ErrorState>({
    errorMessage: "",
    showError: false,
  });

  return (
    <MainContext.Provider
      value={{
        isLoading,
        setIsLoading,
        materialsArray,
        setMaterialsArray,
        sidebarContent,
        setSidebarContent,
        error,
        setError,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
