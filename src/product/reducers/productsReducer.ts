import productsState, {
  ProductsAction,
  ProductsActionType,
  ProductsState,
} from '../context/productsState';

const productsReducer = (
  state: ProductsState,
  { type, payload }: ProductsAction,
): ProductsState => {
  switch (type) {
    case ProductsActionType.UNFETCHED:
      return {
        ...productsState,
        dispatch: state.dispatch,
      };

    case ProductsActionType.ERROR:
      return {
        ...state,
        loading: false,
        error: payload?.error ?? null,
      };

    case ProductsActionType.LOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case ProductsActionType.FETCHED:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        ended: payload?.ended ?? state.ended,
        products: [...state.products, ...(payload?.products ?? [])],
      };

    default:
      return state;
  }
};

export default productsReducer;
