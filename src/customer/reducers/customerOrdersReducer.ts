import { OrdersAction, OrdersActionType, OrdersState } from '../../order';
import customerOrdersState from '../context/customerOrdersState';

const customerOrdersReducer = (
  state: OrdersState,
  { type, payload }: OrdersAction,
): OrdersState => {
  switch (type) {
    case OrdersActionType.UNFETCHED:
      return {
        ...customerOrdersState,
        dispatch: state.dispatch,
      };

    case OrdersActionType.ERROR:
      return {
        ...state,
        loading: false,
        error: payload?.error ?? null,
      };

    case OrdersActionType.LOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case OrdersActionType.FETCHED:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        ended: payload?.ended ?? state.ended,
        orders: [...state.orders, ...(payload?.orders ?? [])],
      };

    default:
      return state;
  }
};

export default customerOrdersReducer;
