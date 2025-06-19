// src/context/MainProvider.tsx
import { useState, type ReactNode, useEffect } from "react"; // <-- Import useEffect
import { type ErrorState, MainContext } from "./MainContext";

const CART_STORAGE_KEY = 'cartSlabIDs'; // Define the key here or import from useCart

export const MainProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [materialsArray, setMaterialsArray] = useState<string[]>([]);
  const [sidebarContent, setSidebarContent] = useState<ReactNode | null>(null);
  const [error, setError] = useState<ErrorState>({
    errorMessage: "",
    showError: false,
  });

  // --- Crucial Change Here: Initialize cartItems directly from localStorage ---
  const [cartItems, setCartItems] = useState<string[]>(() => {
    try {
      const storedCartItems = localStorage.getItem(CART_STORAGE_KEY);
      // Log for debugging:
      console.log("MainProvider: Initializing cart from localStorage:", storedCartItems);
      return storedCartItems ? JSON.parse(storedCartItems) : [];
    } catch (error) {
      console.error("MainProvider: Error parsing cart items from localStorage on init:", error);
      return [];
    }
  });

  // --- Keep this useEffect to persist changes to localStorage ---
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      // Log for debugging:
      console.log("MainProvider: Saving cart to localStorage:", cartItems);
    } catch (error) {
      console.error(
        "MainProvider: Error saving cart items to localStorage:",
        error,
      );
    }
  }, [cartItems]);

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
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};