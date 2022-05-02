import { useNetInfo } from '@react-native-community/netinfo';
import { plainToInstance } from 'class-transformer';
import { useState } from 'react';
import { useCustomer } from '../../customer';
import ApiResponse from '../../dtos/ApiResponse';
import BadRequestType from '../../errors/badRequest';
import ErrorCode, { ErrorCodeType } from '../../errors/ErrorCode';
import { OrderActionType } from '../context/orderState';
import OrderItem, { OrderItemStatus } from '../models/OrderItem';
import orderItemService from '../services/orderItemService';
import useOrder from './orderHook';

type ReturnType = [
  onSubmit: (id: number, status: OrderItemStatus) => Promise<void>,
  loading: boolean,
  success: boolean,
  error: ErrorCodeType,
];

const useOrderItemUpdate = (): ReturnType => {
  const { dispatch } = useOrder();

  const { token } = useCustomer();

  const { isConnected } = useNetInfo();

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState<ErrorCodeType>(null);

  async function onSubmit(id: number, status: OrderItemStatus) {
    if (loading) {
      return;
    }

    if (isConnected === null) {
      return;
    } else if (!isConnected) {
      setError(ErrorCode.NO_NETWORK_CONNECTION);
      return;
    }

    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      orderItemService.authToken = token as string;

      const res = await orderItemService.update(id, { status });

      const body = (await res.json()) as ApiResponse<
        OrderItem | BadRequestType
      >;

      if (res.status === 200) {
        setSuccess(true);
        dispatch?.({
          type: OrderActionType.ITEM_FETCHED,
          payload: {
            order: { orderItems: [plainToInstance(OrderItem, body.data)] },
          },
        });
      } else if (res.status === 401) {
        setError(ErrorCode.UNAUTHORIZED);
      } else if (res.status === 400) {
        setError((body.data as BadRequestType)[0].error_code);
      } else {
        throw new Error();
      }
    } catch (err) {
      setError(ErrorCode.UNKNOWN);
    } finally {
      setLoading(false);
    }
  }

  return [onSubmit, loading, success, error];
};

export default useOrderItemUpdate;
