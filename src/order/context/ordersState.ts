import { ErrorCodeType } from '../../errors/ErrorCode';
import Order from '../models/Order';

export type OrdersState = {
  orders: Order[];
  ended: boolean;
  loaded: boolean;
  loading: boolean;
  error: ErrorCodeType;
  dispatch: null | React.Dispatch<OrdersAction>;
};

export enum OrdersActionType {
  FETCHED = 'ORDERS_FETCHED',
  UNFETCHED = 'ORDERS_UNFETCHED',
  LOADING = 'ORDERS_LOADING',
  ERROR = 'ORDERS_ERROR',
}

export type OrdersAction = {
  type: OrdersActionType;
  payload?: Partial<OrdersState>;
};
