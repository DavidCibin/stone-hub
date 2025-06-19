// src/components/CartPage.js
import React from 'react';
import useCart from '../hooks/useCart'; // Import the useCart hook
import { useMainContext } from '../context/MainContext'; // To potentially show loading etc.

function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { isLoading } = useMainContext(); // Example usage

  if (isLoading) {
    return <div className="p-6">Loading cart...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">
          Your cart is empty. Start adding some slabs!
        </p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cartItems.map((slabId: string) => (
              <li
                key={slabId}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm"
              >
                <span className="font-semibold text-lg">{slabId}</span>
                <button
                  onClick={() => removeFromCart(slabId)}
                  className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={clearCart}
            className="mt-6 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
