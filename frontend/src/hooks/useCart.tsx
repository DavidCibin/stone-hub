// src/hooks/useCart.tsx
import { useCallback } from 'react'; // No need for useState or initial useEffect here
import { useMainContext } from '../context/MainContext';

// CART_STORAGE_KEY can stay here if only useCart cares about it directly,
// but since MainProvider now uses it, it's better to define it in a shared place
// or pass it around, or simply define it in both if they don't share a file.
// For now, let's assume it's defined in MainProvider.

function useCart() {
  const { cartItems, setCartItems } = useMainContext(); // Get cart state from MainContext

  // No initial useEffect here anymore, as MainProvider handles it

  // No useEffect to sync to localStorage here either, as MainProvider handles it

  const addToCart = useCallback((slabId: string) => { // Added type for slabId
    if (!slabId) {
      console.warn("Attempted to add an undefined SlabID to the cart.");
      return;
    }
    setCartItems(prevItems => {
      if (!prevItems.includes(slabId)) {
        console.log(`useCart: Adding SlabID: ${slabId} to cart.`);
        return [...prevItems, slabId];
      } else {
        console.log(`useCart: SlabID: ${slabId} is already in the cart.`);
        return prevItems;
      }
    });
  }, [setCartItems]);

  const removeFromCart = useCallback((slabId: string) => { // Added type for slabId
    setCartItems(prevItems => prevItems.filter(id => id !== slabId));
    console.log(`useCart: Removed SlabID: ${slabId} from cart.`);
  }, [setCartItems]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    console.log("useCart: Cart cleared.");
  }, [setCartItems]);

  const isInCart = useCallback((slabId: string) => { // Added type for slabId
    return cartItems.includes(slabId);
  }, [cartItems]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
  };
}

export default useCart;
