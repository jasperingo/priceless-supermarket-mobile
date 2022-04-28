import { useNetInfo } from '@react-native-community/netinfo';
import { plainToInstance } from 'class-transformer';
import { useCallback } from 'react';
import ApiResponse from '../../dtos/ApiResponse';
import ErrorCode, { parseError } from '../../errors/ErrorCode';
import { CategoriesActionType } from '../context/categoriesState';
import Category from '../models/Category';
import categoryService from '../services/categoryService';
import useCategories from './categoriesHook';

type ReturnType = [
  fetchCategories: () => Promise<void>,
  unfetchCategories: () => void | undefined,
];

const useCategoriesFetch = (): ReturnType => {
  const { dispatch, loading } = useCategories();

  const { isConnected } = useNetInfo();

  const unfetchCategories = useCallback(
    () => dispatch?.({ type: CategoriesActionType.UNFETCHED }),
    [dispatch],
  );

  const fetchCategories = useCallback(async () => {
    if (loading) {
      return;
    }

    if (!isConnected) {
      dispatch?.({
        type: CategoriesActionType.ERROR,
        payload: { error: ErrorCode.NO_NETWORK_CONNECTION },
      });
      return;
    }

    dispatch?.({ type: CategoriesActionType.LOADING });

    try {
      const res = await categoryService.read();

      const body = (await res.json()) as ApiResponse<Category[]>;

      if (res.status === 200) {
        dispatch?.({
          type: CategoriesActionType.FETCHED,
          payload: {
            categories: plainToInstance(Category, body.data),
          },
        });
      } else if (res.status === 404) {
        throw ErrorCode.NOT_FOUND;
      } else {
        throw ErrorCode.UNKNOWN;
      }
    } catch (err) {
      dispatch?.({
        type: CategoriesActionType.ERROR,
        payload: { error: parseError(err) },
      });
    }
  }, [isConnected, loading, dispatch]);

  return [fetchCategories, unfetchCategories];
};

export default useCategoriesFetch;
