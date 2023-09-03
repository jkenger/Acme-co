import { memo } from "react";
import { CartActions, ICartItem } from "../context/CartProvider";
import { CartActionTypes } from "../types/CartActionType";
import { formatCurrency } from "../helpers/formatCurrency";

type Props = {
  item: ICartItem;
  dispatch: React.Dispatch<CartActions>;
  CART_ACTIONS: typeof CartActionTypes;
};

function CartLineItem({ item, dispatch, CART_ACTIONS }: Props) {
  const img: string = new URL(`../images/${item.id}.jpg`, import.meta.url).href;

  const lineTotal: number = item.price * item.qty;
  const highestQty: number = 20 > item.qty ? 20 : item.qty;

  const onChangeQty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const qty: number = parseInt(e.target.value);
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { ...item, qty },
    });
  };

  const onRemoveFromCart = () => {
    dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: item.id });
  };

  const content = (
    <li className="cart__item">
      <div className="cart__item__img">
        <img src={img} alt={item.name} />
      </div>
      <div className="cart__item__details">
        <p>{item.name}</p>
        <p>Price: {formatCurrency("php", item.price)}</p>
        <p>Line Total: {lineTotal}</p>
        <select value={item.qty} onChange={onChangeQty}>
          {[...Array(highestQty)].map((_, i) => {
            const qty: number = i + 1;
            return (
              <option key={qty} value={qty}>
                {qty}
              </option>
            );
          })}
        </select>
        <button className="cart__item__remove" onClick={onRemoveFromCart}>
          Remove
        </button>
      </div>
    </li>
  );

  return content;
}

function areItemsEqual({ item: prevItem }: Props, { item: nextItem }: Props) {
  return Object.keys(prevItem).every((key) => {
    return (
      prevItem[key as keyof ICartItem] === nextItem[key as keyof ICartItem]
    );
  });
}

const MemoizedCartLineItem = memo<typeof CartLineItem>(
  CartLineItem,
  areItemsEqual
);

export default MemoizedCartLineItem;
