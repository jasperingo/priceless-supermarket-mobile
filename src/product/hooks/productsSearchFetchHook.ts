import { useNetInfo } from '@react-native-community/netinfo';
import { plainToInstance } from 'class-transformer';
import { useCallback } from 'react';
import ApiResponse from '../../dtos/ApiResponse';
import ErrorCode, { parseError } from '../../errors/ErrorCode';
import { ProductsSearchActionType } from '../context/productsSearchState';
import Product from '../models/Product';
import productService from '../services/productService';
import useProductsSearch from './productsSearchHook';

type ReturnType = [
  fetchProducts: (
    q: string | null,
    categoryId: number | null,
    before?: number,
  ) => Promise<void>,
  unfetchProducts: () => void | undefined,
];

const useProductsSearchFetch = (): ReturnType => {
  const { dispatch, loading } = useProductsSearch();

  const { isConnected } = useNetInfo();

  const unfetchProducts = useCallback(
    () => dispatch?.({ type: ProductsSearchActionType.UNFETCHED }),
    [dispatch],
  );

  const fetchProducts = useCallback(
    async (q: string | null, categoryId: number | null, before?: number) => {
      if (loading) {
        return;
      }

      if (!isConnected) {
        dispatch?.({
          type: ProductsSearchActionType.ERROR,
          payload: {
            q,
            categoryId,
            error: ErrorCode.NO_NETWORK_CONNECTION,
          },
        });
        return;
      }

      dispatch?.({ type: ProductsSearchActionType.LOADING });

      try {
        const res = await productService.search(
          q as string,
          categoryId as number,
          before,
        );

        const body = (await res.json()) as ApiResponse<Product[]>;

        if (res.status === 200) {
          dispatch?.({
            type: ProductsSearchActionType.FETCHED,
            payload: {
              q,
              categoryId,
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
          type: ProductsSearchActionType.ERROR,
          payload: {
            q,
            categoryId,
            error: parseError(err),
          },
        });
      }
    },
    [isConnected, loading, dispatch],
  );

  return [fetchProducts, unfetchProducts];
};

export default useProductsSearchFetch;
