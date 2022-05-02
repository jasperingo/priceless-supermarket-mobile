import { useState } from 'react';
import { OrdersActionType } from '../../order';
import { CustomerActionType } from '../context/customerState';
import { useCustomerAuthUnset } from './customerAuthStorageHook';
import useCustomer from './customerHook';
import useCustomerOrders from './customerOrdersHook';

const useCustomerSignOut = (): [
  signOut: () => Promise<void>,
  loading: boolean,
  error: boolean,
] => {
  const { dispatch } = useCustomer();

  const { dispatch: orderDispatch } = useCustomerOrders();

  const unauth = useCustomerAuthUnset();

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    setError(false);
    setLoading(true);

    try {
      await unauth();
      dispatch?.({ type: CustomerActionType.UNFETCHED });
      orderDispatch?.({ type: OrdersActionType.UNFETCHED });
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return [signOut, loading, error];
};

export default useCustomerSignOut;
