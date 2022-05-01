import { useNetInfo } from '@react-native-community/netinfo';
import { plainToInstance } from 'class-transformer';
import { useCallback } from 'react';
import ApiResponse from '../../dtos/ApiResponse';
import ErrorCode, { parseError } from '../../errors/ErrorCode';
import { OrderActionType } from '../context/orderState';
import Order from '../models/Order';
import orderService from '../services/orderService';
import useOrder from './orderHook';

type ReturnType = [
  fetchOrder: (ID: number, authToken: string | null) => Promise<void>,
  unfetchOrder: () => void | undefined,
];

const useOrderFetch = (): ReturnType => {
  const { dispatch, loading } = useOrder();

  const { isConnected } = useNetInfo();

  const unfetchOrder = useCallback(
    () => dispatch?.({ type: OrderActionType.UNFETCHED }),
    [dispatch],
  );

  const fetchOrder = useCallback(
    async (ID: number, authToken: string | null) => {
      if (loading) {
        return;
      }

      if (isConnected === null) {
        return;
      } else if (!isConnected) {
        dispatch?.({
          type: OrderActionType.ERROR,
          payload: {
            orderId: ID,
            error: ErrorCode.NO_NETWORK_CONNECTION,
          },
        });
        return;
      }

      dispatch?.({ type: OrderActionType.LOADING });

      try {
        orderService.authToken = authToken ?? '';
        const res = await orderService.readOne(ID);

        const body = (await res.json()) as ApiResponse<Order>;

        if (res.status === 200) {
          dispatch?.({
            type: OrderActionType.FETCHED,
            payload: {
              orderId: ID,
              order: plainToInstance(Order, body.data),
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
          type: OrderActionType.ERROR,
          payload: {
            orderId: ID,
            error: parseError(err),
          },
        });
      }
    },
    [isConnected, loading, dispatch],
  );

  return [fetchOrder, unfetchOrder];
};

export default useOrderFetch;
