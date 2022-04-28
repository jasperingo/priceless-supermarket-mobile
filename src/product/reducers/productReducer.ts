import productState, {
  ProductAction,
  ProductActionType,
  ProductState,
} from '../context/productState';

const productReducer = (
  state: ProductState,
  { type, payload }: ProductAction,
): ProductState => {
  switch (type) {
    case ProductActionType.UNFETCHED:
      return {
        ...productState,
        dispatch: state.dispatch,
      };

    case ProductActionType.ERROR:
      return {
        ...state,
        loading: false,
        error: payload?.error ?? null,
        productId: payload?.productId ?? null,
      };

    case ProductActionType.LOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case ProductActionType.FETCHED:
      return {
        ...state,
        error: null,
        loading: false,
        product: payload?.product ?? null,
        productId: payload?.productId ?? null,
      };

    default:
      return state;
  }
};

export default productReducer;
