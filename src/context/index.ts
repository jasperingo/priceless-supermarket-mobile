import { createContext, useContext, useReducer } from 'react';
import { categoriesReducer, categoriesState } from '../category';
import {
  customerOrdersReducer,
  customerOrdersState,
  customerReducer,
  customerState,
} from '../customer';
import { cartReducer, cartState, orderReducer, orderState } from '../order';
import {
  productReducer,
  productsReducer,
  productsSearchReducer,
  productsSearchState,
  productsState,
  productState,
} from '../product';

export const AppContext = createContext({
  customer: customerState,
  customerOrders: customerOrdersState,
  categories: categoriesState,
  product: productState,
  products: productsState,
  productsSearch: productsSearchState,
  cart: cartState,
  order: orderState,
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

  const [search, searchDispatch] = useReducer(
    productsSearchReducer,
    productsSearchState,
  );

  const [cart, cartDispatch] = useReducer(cartReducer, cartState);

  const [order, orderDispatch] = useReducer(orderReducer, orderState);

  const [customerOrders, customerOrdersDispatch] = useReducer(
    customerOrdersReducer,
    customerOrdersState,
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
    productsSearch: {
      ...search,
      dispatch: searchDispatch,
    },
    cart: {
      ...cart,
      dispatch: cartDispatch,
    },
    order: {
      ...order,
      dispatch: orderDispatch,
    },
    customerOrders: {
      ...customerOrders,
      dispatch: customerOrdersDispatch,
    },
  };
};
