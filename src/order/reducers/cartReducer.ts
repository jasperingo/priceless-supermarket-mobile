import { CartAction, CartActionType, CartState } from '../context/cartState';

const cartReducer = (
  state: CartState,
  { type, payload }: CartAction,
): CartState => {
  switch (type) {
    case CartActionType.ITEM_ADDED:
      return {
        ...state,
        cart: {
          ...state.cart,
          orderItems: payload?.cartItem
            ? [payload?.cartItem, ...(state.cart?.orderItems ?? [])]
            : state.cart?.orderItems,
        },
      };

    default:
      return state;
  }
};

export default cartReducer;
