import ErrorCode from '../../errors/ErrorCode';
import Customer from '../models/Customer';

export type CustomerState = {
  token: null | string;
  customer: null | Customer;
  loading: boolean;
  error: null | ErrorCode;
  customerId: null | string;
  dispatch: null | React.Dispatch<CustomerAction>;
};

export enum CustomerActionType {
  FETCHED = 'CUSTOMER_FETCHED',
  UNFETCHED = 'CUSTOMER_UNFETCHED',
  LOADING = 'CUSTOMER_LOADING',
  ERROR = 'CUSTOMER_ERROR',
}

export type CustomerAction = {
  type: CustomerActionType;
  payload?: Partial<CustomerState>;
};

const customerState: CustomerState = {
  token: null,
  customer: null,
  loading: false,
  error: null,
  customerId: null,
  dispatch: null,
};

export default customerState;
