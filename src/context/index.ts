import { createContext, useContext, useReducer } from 'react';
import { customerReducer, customerState } from '../customer';

export const AppContext = createContext({
  customer: customerState,
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const useAppContextValues = () => {
  const [customer, customerDispatch] = useReducer(
    customerReducer,
    customerState,
  );

  return {
    customer: {
      ...customer,
      dispatch: customerDispatch,
    },
  };
};
