import { useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import ErrorCode, { ErrorCodeType } from '../../errors/ErrorCode';
import useOrder from './orderHook';
import orderService from '../services/orderService';
import ApiResponse from '../../dtos/ApiResponse';
import Order from '../models/Order';
import BadRequestType from '../../errors/badRequest';
import { plainToInstance } from 'class-transformer';
import { OrderActionType } from '../context/orderState';
import useCart from './cartHook';

type ReturnType = [
  onSubmit: () => Promise<void>,
  loading: boolean,
  success: boolean,
  error: ErrorCodeType,
  orderId: number,
  stateError: ErrorCodeType,
  cityError: ErrorCodeType,
  streetError: ErrorCodeType,
  itemsError: ErrorCodeType,
];

const useOrderCreate = (): ReturnType => {
  const { dispatch } = useOrder();

  const { cart } = useCart();

  const { isConnected } = useNetInfo();

  const [orderId, setOrderId] = useState(0);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState<ErrorCodeType>(null);

  const [stateError, setStateError] = useState<ErrorCodeType>(null);

  const [cityError, setCityError] = useState<ErrorCodeType>(null);

  const [streetError, setStreetError] = useState<ErrorCodeType>(null);

  const [itemsError, setItemsError] = useState<ErrorCodeType>(null);

  async function onSubmit() {
    if (loading) {
      return;
    }

    if (!isConnected) {
      setError(ErrorCode.NO_NETWORK_CONNECTION);
      return;
    }

    setError(null);
    setCityError(null);
    setStateError(null);
    setStreetError(null);
    setItemsError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const res = await orderService.create({
        delivery_address_city: cart?.deliveryAddressCity as string,
        delivery_address_state: cart?.deliveryAddressState as string,
        delivery_address_street: cart?.deliveryAddressStreet as string,
        order_items: cart?.orderItems?.map(item => ({
          product_id: item.product?.id,
          quantity: item.quantity,
        })) as [],
      });

      const body = (await res.json()) as ApiResponse<Order | BadRequestType>;

      if (res.status === 201) {
        const order = plainToInstance(Order, body.data);
        setOrderId(order.id as number);
        setSuccess(true);
        dispatch?.({
          type: OrderActionType.FETCHED,
          payload: {
            order,
            orderId: String(order.id),
          },
        });
      } else if (res.status === 400) {
        for (const err of body.data as BadRequestType) {
          switch (err.name) {
            case 'delivery_address_state':
              setStateError(err.error_code);
              break;

            case 'delivery_address_city':
              setCityError(err.error_code);
              break;

            case 'delivery_address_street':
              setStreetError(err.error_code);
              break;

            case 'orderItems':
            case 'order_items':
              setItemsError(err.error_code);
              break;

            default:
          }
        }
      } else {
        throw new Error();
      }
    } catch (err) {
      setError(ErrorCode.UNKNOWN);
    } finally {
      setLoading(false);
    }
  }

  return [
    onSubmit,
    loading,
    success,
    error,
    orderId,
    stateError,
    cityError,
    streetError,
    itemsError,
  ];
};

export default useOrderCreate;
