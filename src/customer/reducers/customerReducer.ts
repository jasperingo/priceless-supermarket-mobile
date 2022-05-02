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
        error: payload?.error ?? state.error,
        customerId: payload?.customerId ?? state.customerId,
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
        token: payload?.token ?? state.token,
        customer: payload?.customer ?? state.customer,
        customerId: payload?.customerId ?? state.customerId,
      };

    default:
      return state;
  }
};

export default customerReducer;
