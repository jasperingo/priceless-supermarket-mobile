import { useNetInfo } from '@react-native-community/netinfo';
import { plainToInstance } from 'class-transformer';
import { useCallback } from 'react';
import ApiResponse from '../../dtos/ApiResponse';
import ErrorCode, { parseError } from '../../errors/ErrorCode';
import { ProductActionType } from '../context/productState';
import Product from '../models/Product';
import productService from '../services/productService';
import useProduct from './productHook';

type ReturnType = [
  fetchCustomer: (ID: number, authToken: string | null) => Promise<void>,
  unfetchCustomer: () => void | undefined,
];

const useProductFetch = (): ReturnType => {
  const { dispatch, loading } = useProduct();

  const { isConnected } = useNetInfo();

  const unfetchProduct = useCallback(
    () => dispatch?.({ type: ProductActionType.UNFETCHED }),
    [dispatch],
  );

  const fetchProduct = useCallback(
    async (ID: number, authToken: string | null) => {
      if (loading) {
        return;
      }

      if (!isConnected) {
        dispatch?.({
          type: ProductActionType.ERROR,
          payload: {
            productId: ID,
            error: ErrorCode.NO_NETWORK_CONNECTION,
          },
        });
        return;
      }

      dispatch?.({ type: ProductActionType.LOADING });

      try {
        productService.authToken = authToken ?? '';
        const res = await productService.readOne(ID);

        const body = (await res.json()) as ApiResponse<Product>;

        if (res.status === 200) {
          dispatch?.({
            type: ProductActionType.FETCHED,
            payload: {
              productId: ID,
              product: plainToInstance(Product, body.data),
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
          type: ProductActionType.ERROR,
          payload: {
            productId: ID,
            error: parseError(err),
          },
        });
      }
    },
    [isConnected, loading, dispatch],
  );

  return [fetchProduct, unfetchProduct];
};

export default useProductFetch;
