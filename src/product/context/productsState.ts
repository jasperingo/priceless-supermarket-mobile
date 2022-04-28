import { ErrorCodeType } from '../../errors/ErrorCode';
import Product from '../models/Product';

export type ProductsState = {
  products: Product[];
  ended: boolean;
  loaded: boolean;
  loading: boolean;
  error: ErrorCodeType;
  dispatch: null | React.Dispatch<ProductsAction>;
};

export enum ProductsActionType {
  FETCHED = 'PRODUCTS_FETCHED',
  UNFETCHED = 'PRODUCTS_UNFETCHED',
  LOADING = 'PRODUCTS_LOADING',
  ERROR = 'PRODUCTS_ERROR',
}

export type ProductsAction = {
  type: ProductsActionType;
  payload?: Partial<ProductsState>;
};

const productsState: ProductsState = {
  products: [],
  ended: false,
  loaded: false,
  loading: false,
  error: null,
  dispatch: null,
};

export default productsState;
