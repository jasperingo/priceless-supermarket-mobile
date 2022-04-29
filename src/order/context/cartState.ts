import Order from '../models/Order';
import OrderItem from '../models/OrderItem';

export type CartState = {
  cart: Order | null;
  dispatch: null | React.Dispatch<CartAction>;
};

export enum CartActionType {
  ITEM_ADDED = 'CART_ITEM_ADDED',
  ITEM_REMOVED = 'CART_ITEM_REMOVED',
  ITEM_QUANTITY_CHANGED = 'CART_ITEM_QUANTITY_CHANGED',
}

export type CartAction = {
  type: CartActionType;
  payload?: { cartItem?: OrderItem; cart?: Order };
};

const cartState: CartState = {
  cart: null,
  dispatch: null,
};

export default cartState;
