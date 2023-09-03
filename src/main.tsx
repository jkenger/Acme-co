import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ProductsProvider } from "./context/ProductsProvider.tsx";
import { CartProvider } from "./context/CartProvider.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductsProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductsProvider>
  </React.StrictMode>
);
