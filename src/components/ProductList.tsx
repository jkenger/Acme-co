import { IProduct } from "../context/ProductsProvider";
import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";
import Product from "./Product";

function ProductList() {
  const { dispatch, CART_ACTIONS, cart } = useCart();
  const { products } = useProducts();

  let pageContent: JSX.Element | JSX.Element[] = <p>Loading...</p>;

  if (products?.length) {
    pageContent = products.map((product: IProduct) => {
      const inCart: boolean = cart.some((item) => item.id === product.id);
      const btnClass: string = inCart ? "btn--danger" : "btn--primary";
      return (
        <Product
          key={product.id}
          product={product}
          CART_ACTIONS={CART_ACTIONS}
          inCart={inCart}
          dispatch={dispatch}
          btnClass={btnClass}
        />
      );
    });
  }

  const content = <main className="main main--products">{pageContent}</main>;

  return <>{content}</>;
}

export default ProductList;
