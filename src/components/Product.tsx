import { memo } from "react";
import { CartActions } from "../context/CartProvider";
import { IProduct } from "../context/ProductsProvider";
import { formatCurrency } from "../helpers/formatCurrency";
import { CartActionTypes } from "../types/CartActionType";

type Props = {
  product: IProduct;
  dispatch: React.Dispatch<CartActions>;
  CART_ACTIONS: typeof CartActionTypes;
  inCart: boolean;
  btnClass: string;
};

function Product({ product, dispatch, CART_ACTIONS, inCart, btnClass }: Props) {
  const img: string = new URL(`../images/${product.id}.jpg`, import.meta.url)
    .href;

  const onAddToCart = () => {
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: { ...product, qty: 1 },
    });
  };

  const itemInCart = inCart ? "item-in-cart ✔" : "";

  const content = (
    <div className="product">
      <div className="product__img-box">
        <img src={img} alt={product.name} />
      </div>
      <div className="product__info">
        <h3>{product.name}</h3>
        <p className="product__price">{formatCurrency("php", product.price)}</p>
        <button className={`btn ${btnClass}`} onClick={onAddToCart}>
          Add to cart
        </button>
        <p className="product__in-cart">{itemInCart}</p>
      </div>
    </div>
  );

  return content;
}

function areProductsEqual(
  { product: prevProduct, inCart: prevInCart }: Props,
  { product: nextProduct, inCart: nextInCart }: Props
) {
  return Object.keys(prevProduct).every((key) => {
    return (
      prevProduct[key as keyof IProduct] ===
        nextProduct[key as keyof IProduct] && prevInCart === nextInCart
    );
  });
}
const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);
export default MemoizedProduct;
