import {
  ProductAction,
  ProductActionType,
  ProductState,
} from '../context/productState';

const productReducer = (
  state: ProductState,
  { type, payload }: ProductAction,
): ProductState => {
  switch (type) {
    case ProductActionType.FETCHED:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

export default productReducer;
