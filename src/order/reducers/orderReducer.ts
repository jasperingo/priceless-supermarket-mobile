import orderState, {
  OrderAction,
  OrderActionType,
  OrderState,
} from '../context/orderState';

const orderReducer = (
  state: OrderState,
  { type, payload }: OrderAction,
): OrderState => {
  switch (type) {
    case OrderActionType.UNFETCHED:
      return {
        ...orderState,
        dispatch: state.dispatch,
      };

    case OrderActionType.ERROR:
      return {
        ...state,
        loading: false,
        error: payload?.error ?? null,
        orderId: payload?.orderId ?? null,
      };

    case OrderActionType.LOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case OrderActionType.FETCHED:
      return {
        ...state,
        error: null,
        loading: false,
        order: payload?.order ?? null,
        orderId: payload?.orderId ?? null,
      };

    default:
      return state;
  }
};

export default orderReducer;
