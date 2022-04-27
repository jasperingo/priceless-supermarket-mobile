import { useCallback } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { plainToInstance } from 'class-transformer';
import useCustomer from './customerHook';
import { CustomerActionType } from '../context/customerState';
import ErrorCode, { parseError } from '../../errors/ErrorCode';
import customerService from '../services/customerService';
import ApiResponse from '../../dtos/ApiResponse';
import Customer from '../models/Customer';

type ReturnType = [
  fetchCustomer: (ID: number, authToken: string) => Promise<void>,
  unfetchCustomer: () => void | undefined,
  customer: Customer | null,
  loading: boolean,
  error: ErrorCode | null,
  customerId: string | null,
];

const useCustomerFetch = (): ReturnType => {
  const { dispatch, customer, customerId, error, loading } = useCustomer();

  const { isConnected } = useNetInfo();

  const unfetchCustomer = useCallback(
    () => dispatch?.({ type: CustomerActionType.UNFETCHED }),
    [dispatch],
  );

  const fetchCustomer = useCallback(
    async (ID: number, authToken: string) => {
      if (loading) {
        return;
      }

      if (!isConnected) {
        dispatch?.({
          type: CustomerActionType.ERROR,
          payload: {
            customerId: String(ID),
            error: ErrorCode.NO_NETWORK_CONNECTION,
          },
        });
        return;
      }

      dispatch?.({ type: CustomerActionType.LOADING });

      try {
        customerService.authToken = authToken;
        const res = await customerService.readOne(ID);

        const body = (await res.json()) as ApiResponse<Customer>;

        if (res.status === 200) {
          dispatch?.({
            type: CustomerActionType.FETCHED,
            payload: {
              token: authToken,
              customerId: String(ID),
              customer: plainToInstance(Customer, body.data),
            },
          });
        } else if (res.status === 401) {
          throw ErrorCode.UNAUTHORIZED;
        } else if (res.status === 404) {
          throw ErrorCode.NOT_FOUND;
        } else if (res.status === 403) {
          throw ErrorCode.PERMISSION_DENIED;
        } else {
          throw ErrorCode.UNKNOWN;
        }
      } catch (err) {
        dispatch?.({
          type: CustomerActionType.ERROR,
          payload: {
            customerId: String(ID),
            error: parseError(err),
          },
        });
      }
    },
    [isConnected, loading, dispatch],
  );

  return [fetchCustomer, unfetchCustomer, customer, loading, error, customerId];
};

export default useCustomerFetch;
