import categoriesState, {
  CategoriesAction,
  CategoriesActionType,
  CategoriesState,
} from '../context/categoriesState';

const categoriesReducer = (
  state: CategoriesState,
  { type, payload }: CategoriesAction,
): CategoriesState => {
  switch (type) {
    case CategoriesActionType.UNFETCHED:
      return {
        ...categoriesState,
        dispatch: state.dispatch,
      };

    case CategoriesActionType.ERROR:
      return {
        ...state,
        loading: false,
        error: payload?.error ?? null,
      };

    case CategoriesActionType.LOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case CategoriesActionType.FETCHED:
      return {
        ...state,
        error: null,
        loaded: true,
        loading: false,
        categories: payload?.categories ?? state.categories,
      };

    default:
      return state;
  }
};

export default categoriesReducer;
