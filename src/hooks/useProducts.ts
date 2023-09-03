import { IProducts, ProductsContext } from "../context/ProductsProvider";
import { useContext } from "react";

// Create a custom hook for products must have a return type of Products
export function useProducts(): IProducts {
  const context = useContext<IProducts>(ProductsContext);
  if (!context)
    throw new Error("useProduct must be used within a ProductsProvider");
  return context;
}
