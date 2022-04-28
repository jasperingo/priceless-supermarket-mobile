import { ErrorCodeType } from '../../errors/ErrorCode';
import Category from '../models/Category';

export type CategoriesState = {
  categories: Category[];
  loaded: boolean;
  loading: boolean;
  error: ErrorCodeType;
  dispatch: null | React.Dispatch<CategoriesAction>;
};

export enum CategoriesActionType {
  FETCHED = 'CATEGORIES_FETCHED',
  UNFETCHED = 'CATEGORIES_UNFETCHED',
  LOADING = 'CATEGORIES_LOADING',
  ERROR = 'CATEGORIES_ERROR',
}

export type CategoriesAction = {
  type: CategoriesActionType;
  payload?: Partial<CategoriesState>;
};

const categoriesState: CategoriesState = {
  categories: [],
  loaded: false,
  loading: false,
  error: null,
  dispatch: null,
};

export default categoriesState;
