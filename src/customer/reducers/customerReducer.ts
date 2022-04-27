import customerState, {
  CustomerAction,
  CustomerActionType,
  CustomerState,
} from '../context/customerState';

const customerReducer = (
  state: CustomerState,
  { type, payload }: CustomerAction,
): CustomerState => {
  switch (type) {
    case CustomerActionType.UNFETCHED:
      return {
        ...customerState,
        dispatch: state.dispatch,
      };

    case CustomerActionType.ERROR:
      return {
        ...state,
        loading: false,
        error: payload?.error ?? null,
        customerId: payload?.customerId ?? null,
      };

    case CustomerActionType.LOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };

    case CustomerActionType.FETCHED:
      return {
        ...state,
        error: null,
        loading: false,
        token: payload?.token ?? null,
        customer: payload?.customer ?? null,
        customerId: payload?.customerId ?? null,
      };

    default:
      return state;
  }
};

export default customerReducer;
