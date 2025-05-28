import { createContext, useContext } from "react";

export type ScreenContextType = {
  isMobile: boolean;
  screenWidth: number;
  screenHeight: number;
};

export const AppContext = createContext<ScreenContextType>({
  isMobile: false,
  screenWidth: 0,
  screenHeight: 0,
});

export const useScreenContext = () => useContext(AppContext);
