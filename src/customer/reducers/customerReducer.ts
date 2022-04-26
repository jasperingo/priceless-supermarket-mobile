import {
  CustomerAction,
  // CustomerActionType,
  CustomerState,
} from '../context/customerState';

const customerReducer = (state: CustomerState, { type }: CustomerAction) => {
  switch (type) {
    default:
      return state;
  }
};

export default customerReducer;
