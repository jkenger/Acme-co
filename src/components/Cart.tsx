import { useCart } from "../hooks/useCart";
import { useState } from "react";
import CartLineItem from "./CartLineItem";

function Cart() {
  const [confirm, setConfirm] = useState<boolean>(false);
  const { dispatch, CART_ACTIONS, cart, totalItems, totalPrice } = useCart();

  const onSubmitOrder = () => {
    dispatch({ type: CART_ACTIONS.SUBMIT });
    setConfirm(true);
  };

  const pageContent = confirm ? (
    <h2>Thank you for your order.</h2>
  ) : (
    <>
      <h2 className="offscreen">Cart</h2>
      <ul>
        {cart.map((item) => {
          return (
            <CartLineItem
              key={item.id}
              item={item}
              dispatch={dispatch}
              CART_ACTIONS={CART_ACTIONS}
            />
          );
        })}
      </ul>
      <div className="cart__totals">
        <p>Total Items: {totalItems}</p>
        <p>Total Price: {totalPrice}</p>
        <button
          className="cart__submit"
          onClick={onSubmitOrder}
          disabled={!totalItems}
        >
          Submit Order
        </button>
      </div>
    </>
  );

  const content = <main className="main main--cart">{pageContent}</main>;

  return <div>{content}</div>;
}
export default Cart;
