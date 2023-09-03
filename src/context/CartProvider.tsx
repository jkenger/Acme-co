import { ReactElement, createContext, useMemo, useReducer } from "react";
import { IProduct } from "./ProductsProvider";
import { CartActionTypes } from "../types/CartActionType";
import { formatCurrency } from "../helpers/formatCurrency";

// Interface for cart   @private
interface ICart {
  cart: ICartItem[];
}

// Interface for cart item   @shareable
export interface ICartItem extends IProduct {
  qty: number;
}

// Interface for children   @private
interface IChildren {
  children?: React.ReactNode | ReactElement[];
}

// Initial state for cart must have an interface of Cart
const initialState: ICart = {
  cart: [],
};

// Interface for Add to Cart   @shareable
interface IAddToCartAction {
  type: CartActionTypes.ADD_TO_CART;
  payload: ICartItem;
}

// Interface for Remove from Cart   @shareable
interface IRemoveFromCartAction {
  type: CartActionTypes.REMOVE_FROM_CART;
  payload: number;
}

// Interface for Clear Cart Action   @shareable
interface ISubmitCartAction {
  type: CartActionTypes.SUBMIT;
}

interface IQuantityCartAction {
  type: CartActionTypes.UPDATE_QUANTITY;
  payload: ICartItem;
}

// Union type for Cart Actions   @private
export type CartActions =
  | IQuantityCartAction
  | IAddToCartAction
  | IRemoveFromCartAction
  | ISubmitCartAction;

// Enum for Action Types   @shareable

function cartReducer(state: ICart, action: CartActions): ICart {
  /* 
  state = {
    cart: [],
  }

  action.payload = {
    id: 1,
    name: "Product 1",
    price: 100,
  }
*/
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART: {
      console.log(action.payload);
      const { id, name, price } = action.payload;
      /* 
        id = number
        name = string
        price = number
      */
      const filteredCart: ICartItem[] = state.cart.filter((item) => {
        return item.id !== id;
      });

      // Check if item exist in the cart
      const itemExist: ICartItem | undefined = state.cart.find((item) => {
        return item.id === id;
      });

      // Check if item exist, if it does, add quantity + 1, else just 1
      const qty: number = itemExist ? itemExist.qty + 1 : 1;

      return { ...state, cart: [...filteredCart, { id, name, price, qty }] };
    }
    case CartActionTypes.REMOVE_FROM_CART: {
      // action.payload = number
      const id = action.payload;

      /* 
        id = 1
      */

      const filteredCart: ICartItem[] = state.cart.filter((item) => {
        return item.id !== id;
      });

      return { ...state, cart: [...filteredCart] };
      break;
    }
    case CartActionTypes.SUBMIT: {
      return { ...state, cart: [] };
    }
    case CartActionTypes.UPDATE_QUANTITY: {
      const payload = action.payload;
      /* 
        id = number
        name = string
        price = number
      */

      // Check if item exist in the cart
      const itemExist: ICartItem | undefined = state.cart.find((item) => {
        return item.id === payload.id;
      });

      if (!itemExist)
        throw new Error("Item must exist in order to update quantity");

      const updatedItem: ICartItem = { ...itemExist, qty: payload.qty };

      const filteredCart: ICartItem[] = state.cart.filter((item) => {
        return item.id !== payload.id;
      });

      return { ...state, cart: [...filteredCart, updatedItem] };
    }

    // Return original state.
    default:
      throw new Error("Action Unknown");
  }
}

// Create a hook for cart actions
function useCartReducer(initialState: ICart) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const CART_ACTIONS = useMemo(() => {
    return CartActionTypes;
  }, []);

  const totalItems = state.cart.reduce((prev, cartItem) => {
    return prev + cartItem.qty;
  }, 0);
  const tempTotal = state.cart.reduce((prev, cartItem) => {
    return prev + cartItem.qty * cartItem.price;
  }, 0);
  const totalPrice = formatCurrency("php", tempTotal);

  const cart = state.cart.sort((a, b) => {
    const itemA = a.id;
    const itemB = b.id;

    return itemA - itemB;
  });

  return { dispatch, CART_ACTIONS, totalItems, totalPrice, cart };
}

// Get return type of useCartReducer
export type UseCart = ReturnType<typeof useCartReducer>;

const initCartContextState: UseCart = {
  dispatch: () => {},
  CART_ACTIONS: CartActionTypes,
  totalItems: 0,
  totalPrice: "",
  cart: [],
};

// Cart context provider
export const CartContext = createContext<UseCart>(initCartContextState);

function CartProvider({ children }: IChildren) {
  return (
    <CartContext.Provider value={useCartReducer(initialState)}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { CartProvider };
