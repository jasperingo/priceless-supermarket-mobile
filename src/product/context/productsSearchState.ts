import { ErrorCodeType } from '../../errors/ErrorCode';
import Product from '../models/Product';

export type ProductsSearchState = {
  products: Product[];
  q: null | string;
  categoryId: null | number;
  ended: boolean;
  loaded: boolean;
  loading: boolean;
  error: ErrorCodeType;
  dispatch: null | React.Dispatch<ProductsSearchAction>;
};

export enum ProductsSearchActionType {
  FETCHED = 'PRODUCTS_SEARCH_FETCHED',
  UNFETCHED = 'PRODUCTS_SEARCH_UNFETCHED',
  LOADING = 'PRODUCTS_SEARCH_LOADING',
  ERROR = 'PRODUCTS_SEARCH_ERROR',
}

export type ProductsSearchAction = {
  type: ProductsSearchActionType;
  payload?: Partial<ProductsSearchState>;
};

const productsSearchState: ProductsSearchState = {
  products: [],
  ended: false,
  loaded: false,
  loading: false,
  error: null,
  dispatch: null,
  q: null,
  categoryId: null,
};

export default productsSearchState;
