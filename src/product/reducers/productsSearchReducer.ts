import productsSearchState, {
  ProductsSearchAction,
  ProductsSearchActionType,
  ProductsSearchState,
} from '../context/productsSearchState';

const productsSearchReducer = (
  state: ProductsSearchState,
  { type, payload }: ProductsSearchAction,
): ProductsSearchState => {
  switch (type) {
    case ProductsSearchActionType.UNFETCHED:
      return {
        ...productsSearchState,
        dispatch: state.dispatch,
      };

    case ProductsSearchActionType.ERROR:
      return {
        ...state,
        loading: false,
        q: payload?.q ?? state.q,
        error: payload?.error ?? null,
        categoryId: payload?.categoryId ?? state.categoryId,
      };

    case ProductsSearchActionType.LOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case ProductsSearchActionType.FETCHED:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        q: payload?.q ?? state.q,
        ended: payload?.ended ?? state.ended,
        categoryId: payload?.categoryId ?? state.categoryId,
        products: [...state.products, ...(payload?.products ?? [])],
      };

    default:
      return state;
  }
};

export default productsSearchReducer;
