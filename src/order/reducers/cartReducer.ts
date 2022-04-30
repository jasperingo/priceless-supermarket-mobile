import { CartAction, CartActionType, CartState } from '../context/cartState';

const cartReducer = (
  state: CartState,
  { type, payload }: CartAction,
): CartState => {
  switch (type) {
    case CartActionType.ITEM_ADDED:
      let newList;
      const existingItem = state.cart?.orderItems?.find(
        item => item?.product?.id === payload?.cartItem?.product?.id,
      );
      if (existingItem && payload?.cartItem?.quantity) {
        const newQuantity =
          payload.cartItem.quantity + (existingItem.quantity ?? 0);

        if (newQuantity <= (existingItem.product?.quantity as number)) {
          payload.cartItem.quantity = newQuantity;
        } else {
          payload.cartItem.quantity = existingItem.quantity;
        }

        newList = state.cart?.orderItems?.filter(
          item => item?.product?.id !== existingItem?.product?.id,
        );
      } else {
        newList = state.cart?.orderItems;
      }
      return {
        ...state,
        cart: {
          ...state.cart,
          orderItems: payload?.cartItem
            ? [payload?.cartItem, ...(newList ?? [])]
            : state.cart?.orderItems,
        },
      };

    case CartActionType.ITEM_REMOVED:
      return {
        ...state,
        cart: {
          ...state.cart,
          orderItems: state.cart?.orderItems?.filter(
            item => item.product?.id !== payload?.cartItem?.product?.id,
          ),
        },
      };

    case CartActionType.ITEM_QUANTITY_CHANGED:
      return {
        ...state,
        cart: {
          ...state.cart,
          orderItems: state.cart?.orderItems?.map(item =>
            payload?.cartItem &&
            item.product?.id === payload.cartItem.product?.id
              ? payload?.cartItem
              : item,
          ),
        },
      };

    default:
      return state;
  }
};

export default cartReducer;
