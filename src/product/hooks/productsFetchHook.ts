import { useCallback } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { ProductsActionType } from '../context/productsState';
import useProducts from './productsHook';
import ErrorCode, { parseError } from '../../errors/ErrorCode';
import productService from '../services/productService';
import ApiResponse from '../../dtos/ApiResponse';
import Product from '../models/Product';
import { plainToInstance } from 'class-transformer';

type ReturnType = [
  fetchProducts: (before?: number) => Promise<void>,
  unfetchProducts: () => void | undefined,
];

const useProductsFetch = (): ReturnType => {
  const { dispatch, loading } = useProducts();

  const { isConnected } = useNetInfo();

  const unfetchProducts = useCallback(
    () => dispatch?.({ type: ProductsActionType.UNFETCHED }),
    [dispatch],
  );

  const fetchProducts = useCallback(
    async (before?: number) => {
      if (loading) {
        return;
      }

      if (!isConnected) {
        dispatch?.({
          type: ProductsActionType.ERROR,
          payload: { error: ErrorCode.NO_NETWORK_CONNECTION },
        });
        return;
      }

      dispatch?.({ type: ProductsActionType.LOADING });

      try {
        const res = await productService.read(before);

        const body = (await res.json()) as ApiResponse<Product[]>;

        if (res.status === 200) {
          dispatch?.({
            type: ProductsActionType.FETCHED,
            payload: {
              ended: body.data.length === 0,
              products: plainToInstance(Product, body.data),
            },
          });
        } else if (res.status === 404) {
          throw ErrorCode.NOT_FOUND;
        } else {
          throw ErrorCode.UNKNOWN;
        }
      } catch (err) {
        dispatch?.({
          type: ProductsActionType.ERROR,
          payload: { error: parseError(err) },
        });
      }
    },
    [isConnected, loading, dispatch],
  );

  return [fetchProducts, unfetchProducts];
};

export default useProductsFetch;
