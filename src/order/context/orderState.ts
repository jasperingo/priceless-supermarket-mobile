import ErrorCode from '../../errors/ErrorCode';
import Order from '../models/Order';

export type OrderState = {
  order: null | Order;
  loading: boolean;
  error: null | ErrorCode;
  orderId: null | number;
  dispatch: null | React.Dispatch<OrderAction>;
};

export enum OrderActionType {
  FETCHED = 'ORDER_FETCHED',
  UNFETCHED = 'ORDER_UNFETCHED',
  LOADING = 'ORDER_LOADING',
  ERROR = 'ORDER_ERROR',
  ITEM_FETCHED = 'ORDER_ITEM_FETCHED',
}

export type OrderAction = {
  type: OrderActionType;
  payload?: Partial<OrderState>;
};

const orderState: OrderState = {
  order: null,
  loading: false,
  error: null,
  orderId: null,
  dispatch: null,
};

export default orderState;
