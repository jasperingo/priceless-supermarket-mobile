import { createContext, useContext, useReducer } from 'react';
import { categoriesReducer, categoryState } from '../category';
import { customerReducer, customerState } from '../customer';

export const AppContext = createContext({
  customer: customerState,
  categories: categoryState,
});

export const useAppContext = () => {
  return useContext(AppContext);
};

export const useAppContextValues = () => {
  const [customer, customerDispatch] = useReducer(
    customerReducer,
    customerState,
  );

  const [catetories, categoriesDispatch] = useReducer(
    categoriesReducer,
    categoryState,
  );

  return {
    customer: {
      ...customer,
      dispatch: customerDispatch,
    },
    categories: {
      ...catetories,
      dispatch: categoriesDispatch,
    },
  };
};
