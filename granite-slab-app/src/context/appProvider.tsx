import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AppContext } from "./appContext";

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth < 1024;

  return (
    <AppContext.Provider value={{ isMobile, screenWidth, screenHeight }}>
      {children}
    </AppContext.Provider>
  );
};
