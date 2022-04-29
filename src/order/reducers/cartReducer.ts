import { CartAction, CartActionType, CartState } from '../context/cartState';

const cartReducer = (
  state: CartState,
  { type, payload }: CartAction,
): CartState => {
  switch (type) {
    case CartActionType.ITEM_ADDED:
      return {
        ...payload,
        ...state,
      };

    default:
      return state;
  }
};

export default cartReducer;
