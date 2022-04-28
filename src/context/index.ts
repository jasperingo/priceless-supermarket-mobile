import { createContext, useContext, useReducer } from 'react';
import { categoriesReducer, categoriesState } from '../category';
import { customerReducer, customerState } from '../customer';
import {
  productReducer,
  productsReducer,
  productsState,
  productState,
} from '../product';

export const AppContext = createContext({
  customer: customerState,
  categories: categoriesState,
  product: productState,
  products: productsState,
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
    categoriesState,
  );

  const [product, productDispatch] = useReducer(productReducer, productState);

  const [products, productsDispatch] = useReducer(
    productsReducer,
    productsState,
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
    product: {
      ...product,
      dispatch: productDispatch,
    },
    products: {
      ...products,
      dispatch: productsDispatch,
    },
  };
};
