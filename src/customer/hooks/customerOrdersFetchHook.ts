import { useNetInfo } from '@react-native-community/netinfo';
import { plainToInstance } from 'class-transformer';
import { useCallback } from 'react';
import ApiResponse from '../../dtos/ApiResponse';
import ErrorCode, { parseError } from '../../errors/ErrorCode';
import { Order, OrdersActionType } from '../../order';
import customerService from '../services/customerService';
import useCustomerOrders from './customerOrdersHook';

type ReturnType = [
  fetchOrders: (
    id: number,
    authToken: string,
    before?: number,
  ) => Promise<void>,
  unfetchOrders: () => void | undefined,
];

const useCustomerOrdersFetch = (): ReturnType => {
  const { dispatch, loading } = useCustomerOrders();

  const { isConnected } = useNetInfo();

  const unfetchOrders = useCallback(
    () => dispatch?.({ type: OrdersActionType.UNFETCHED }),
    [dispatch],
  );

  const fetchOrders = useCallback(
    async (id: number, authToken: string, before?: number) => {
      if (loading) {
        return;
      }

      if (isConnected === null) {
        return;
      } else if (!isConnected) {
        dispatch?.({
          type: OrdersActionType.ERROR,
          payload: { error: ErrorCode.NO_NETWORK_CONNECTION },
        });
        return;
      }

      dispatch?.({ type: OrdersActionType.LOADING });

      try {
        customerService.authToken = authToken;

        const res = await customerService.readOrders(id, before);

        const body = (await res.json()) as ApiResponse<Order[]>;

        if (res.status === 200) {
          dispatch?.({
            type: OrdersActionType.FETCHED,
            payload: {
              ended: body.data.length === 0,
              orders: plainToInstance(Order, body.data),
            },
          });
        } else if (res.status === 401) {
          throw ErrorCode.UNAUTHORIZED;
        } else if (res.status === 404) {
          throw ErrorCode.NOT_FOUND;
        } else {
          throw ErrorCode.UNKNOWN;
        }
      } catch (err) {
        dispatch?.({
          type: OrdersActionType.ERROR,
          payload: { error: parseError(err) },
        });
      }
    },
    [isConnected, loading, dispatch],
  );

  return [fetchOrders, unfetchOrders];
};

export default useCustomerOrdersFetch;
