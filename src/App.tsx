import { useState } from "react";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";

function App() {
  // const { products } = useProduct();
  const [viewCart, setViewCart] = useState<boolean>(false);

  const pageContent = viewCart ? <Cart /> : <ProductList />;
  return (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {pageContent}
      <Footer viewCart={viewCart} />
    </>
  );
}

export default App;
