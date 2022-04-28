import { ErrorCodeType } from '../../errors/ErrorCode';
import Product from '../models/Product';

export type ProductState = {
  product: null | Product;
  productId: null | number;
  loading: boolean;
  error: ErrorCodeType;
  dispatch: null | React.Dispatch<ProductAction>;
};

export enum ProductActionType {
  FETCHED = 'PRODUCT_FETCHED',
  UNFETCHED = 'PRODUCT_UNFETCHED',
  LOADING = 'PRODUCT_LOADING',
  ERROR = 'PRODUCT_ERROR',
}

export type ProductAction = {
  type: ProductActionType;
  payload?: Partial<ProductState>;
};

const productState: ProductState = {
  product: null,
  productId: null,
  loading: false,
  error: null,
  dispatch: null,
};

export default productState;
