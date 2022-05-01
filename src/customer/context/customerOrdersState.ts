import { OrdersState } from '../../order';

const customerOrdersState: OrdersState = {
  orders: [],
  ended: false,
  loaded: false,
  loading: false,
  error: null,
  dispatch: null,
};

export default customerOrdersState;
