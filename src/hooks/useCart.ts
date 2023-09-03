import { CartContext } from "./../context/CartProvider";
import { useContext } from "react";

// Hook for using cart
export function useCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("Use Cart Provider was used outside the Provider");

  return context;
}
