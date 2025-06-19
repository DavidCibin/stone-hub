import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export interface ErrorState {
  errorMessage: string;
  showError: boolean;
}

export type MainContextType = {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  materialsArray: string[];
  setMaterialsArray: (materials: string[]) => void;
  sidebarContent: ReactNode | null;
  setSidebarContent: (content: ReactNode | null) => void;
  error: ErrorState;
  setError: (error: ErrorState) => void;
  cartItems: string[];
  setCartItems: (items: string[] | ((prev: string[]) => string[])) => void;
};

export const MainContext = createContext<MainContextType>({
  isLoading: false,
  setIsLoading: () => {},
  materialsArray: [],
  setMaterialsArray: () => {},
  sidebarContent: null,
  setSidebarContent: () => {},
  error: { errorMessage: "", showError: false },
  setError: () => {},
  cartItems: [],
  setCartItems: () => {},
});

export const useMainContext = () => useContext(MainContext);
