import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export type SidebarContextType = {
  content: ReactNode | null;
  setContent: (content: ReactNode | null) => void;
};

export const SidebarContext = createContext<SidebarContextType>({
  content: null,
  setContent: () => {},
});

export const useSidebar = () => useContext(SidebarContext);
